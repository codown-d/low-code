const { Controller } = require("egg");

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0]; // 获取上传的文件

    if (!file) {
      ctx.throw(400, "请上传文件");
    }
    const COS = require("cos-nodejs-sdk-v5");
    const cos = new COS({
      SecretId: process.env.SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
      SecretKey: process.env.SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    });
    console.log(file);
    try {
      const result = await ctx.service.tencentCos.uploadFile(file);
      ctx.body = {
        code: 200,
        message: "上传成功",
        data: result.url,
      };
    } catch (error) {
      ctx.throw(500, "上传失败");
    }
  }
}

module.exports = UploadController;
