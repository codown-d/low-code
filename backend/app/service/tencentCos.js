const COS = require("cos-nodejs-sdk-v5");
const { Service } = require("egg");

class TencentCosService extends Service {
  async uploadFile(file) {
    const { ctx, app } = this;
    const cosConfig = app.config.tencentCOS;

    // 创建 COS 实例
    const cos = new COS({
      SecretId: cosConfig.SecretId,
      SecretKey: cosConfig.SecretKey,
    });

    // 获取文件信息
    const fileStream = require("fs").createReadStream(file.filepath);
    const fileName = `uploads/${Date.now()}_${file.filename}`;

    try {
      const result = await cos.putObject({
        Bucket: cosConfig.Bucket,
        Region: cosConfig.Region,
        Key: fileName,
        Body: fileStream,
        ContentLength: file.fileSize,
      });

      return {
        url: `https://${result.Location}`,
      };
    } catch (error) {
      ctx.logger.error("上传文件到腾讯云 COS 失败", error);
      throw new Error("文件上传失败");
    }
  }
  async listFiles() {
    const { ctx, app } = this;
    const cosConfig = app.config.tencentCOS; // 你的 COS 配置

    // 创建 COS 实例
    const cos = new COS({
      SecretId: cosConfig.SecretId,
      SecretKey: cosConfig.SecretKey,
    });

    const params = {
      Bucket: cosConfig.Bucket, // 存储桶名称
      Region: cosConfig.Region, // 存储桶区域
      Prefix: "", // 可以指定前缀来过滤文件
      MaxKeys: 100, // 获取文件列表的最大条数
    };

    try {
      const result = await cos.getBucket(params); // 获取存储桶的文件列表
      const files = result.Contents || [];
      const jsonFiles = files.filter(file => file.Key.endsWith('.json'));
      const fileListWithUrls = await Promise.all(
        jsonFiles.map(async (file) => {
          const filePath = file.Key; // 获取文件路径

          // 生成签名 URL，设置过期时间为1小时
          const previewUrl = await cos.getObjectUrl({
            Bucket: cosConfig.Bucket,
            Region: cosConfig.Region,
            Key: filePath,
            Expires: 60 * 60, // 设置 URL 的有效期，单位是秒
          });

          return {
            fileName: file.Key, // 文件名
            lastModified: file.LastModified, // 最后修改时间
            size: file.Size, // 文件大小
            previewUrl, // 预览 URL
          };
        })
      );
      return fileListWithUrls; // 返回文件列表并包含预览 URL
    } catch (error) {
      ctx.logger.error("获取腾讯云 COS 文件列表失败", error);
      throw new Error("获取文件列表失败");
    }
  }
  // 获取 JSON 文件内容
  async getJsonFile(fileName) {
   const { ctx, app } = this;
   const cosConfig = app.config.tencentCOS; // 你的 COS 配置

   // 创建 COS 实例
   const cos = new COS({
     SecretId: cosConfig.SecretId,
     SecretKey: cosConfig.SecretKey,
   });

   const params = {
     Bucket: cosConfig.Bucket, // 存储桶名称
     Region: cosConfig.Region, // 存储桶区域
     Key: fileName, // 文件路径（需要提供）
   };

   try {
     const result = await cos.getObject(params); // 获取存储桶的文件内容
    
     return result
   } catch (error) { 
    ctx.logger.error("获取文件内容失败", error);
    throw new Error('获取文件内容失败', error);
   }
 }
}

module.exports = TencentCosService;
