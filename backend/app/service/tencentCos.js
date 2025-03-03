const COS = require('cos-nodejs-sdk-v5');
const { Service } = require('egg');

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
    const fileStream = require('fs').createReadStream(file.filepath);
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
      ctx.logger.error('上传文件到腾讯云 COS 失败', error);
      throw new Error('文件上传失败');
    }
  }
}

module.exports = TencentCosService;
