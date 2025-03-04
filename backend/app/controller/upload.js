const { Controller } = require("egg");

    const COS = require("cos-nodejs-sdk-v5");
class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0]; // 获取上传的文件

    if (!file) {
      ctx.throw(400, "请上传文件");
    }
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
  async listFiles() {
    const { ctx } = this;
    try {
      // 调用 TencentCosService 获取文件列表
      const fileList = await ctx.service.tencentCos.listFiles();
      ctx.body = {
        code:200,
        message: '文件列表获取成功',
        data: fileList,
      };
    } catch (error) {
      ctx.body = {
        message: '文件列表获取失败',
        error: error.message,
      };
    }
  }
  async getJsonFile() {
    const { ctx } = this;
    const { fileName } = ctx.query;
    try {
      const result = await ctx.service.tencentCos.getJsonFile(fileName);
      const fileContent = result.Body.toString('utf-8'); // 获取文件内容并转为字符串
      const jsonData = JSON.parse(fileContent);
      ctx.body = {
        code:200,
        message: '文件获取成功',
        data: jsonData,
      };
    } catch (error) {
      ctx.body = {
        message: '文件获取失败',
        error: error.message,
      };
    }
  }
}

module.exports = UploadController;
