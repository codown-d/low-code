/* eslint valid-jsdoc: "off" */

require("dotenv").config();
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// add your user config here
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    multipart: {
      mode: "file", // 以文件模式处理
      fileExtensions: [".jpg", ".png", "doc", "json", ".gif", ".pdf"], // 可以上传的文件类型
    },
    security: {
      csrf: {
        enable: false, // 关闭 CSRF 保护
      },
    },
    cors: {
      origin: "*", // 允许所有域名跨域请求，生产环境中最好指定允许的域名
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH", // 允许的方法
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1740985471842_6255";

  // add your middleware config here
  config.middleware = [];

  let { SecretId, SecretKey } = process.env;
  const userConfig = {
    // myAppName: 'egg',

    tencentCOS: {
      SecretId,
      SecretKey,
      Bucket: "lowcode-1302901088",
      Region: "ap-chengdu", // 例如 ap-shanghai
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
