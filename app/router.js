/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/getHomeBanner', controller.home.getHomeBanner);
  router.post('/getHomeInfo', controller.home.getHomeInfo);
  router.post('/getHomeShuffle', controller.home.getHomeShuffle);
  router.post('/getRecommedList', controller.recommed.getRecommedList);
};
