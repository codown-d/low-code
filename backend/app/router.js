/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/upload', controller.upload.upload);
  router.get('/api/list-files', controller.upload.listFiles);
  router.get('/api/json-file', controller.upload.getJsonFile);
};
