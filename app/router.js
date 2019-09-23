/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;
  //TODO 微信
  router.post('/getHomeBanner', controller.wx.home.getHomeBanner);
  router.post('/getHomeInfo', controller.wx.home.getHomeInfo);
  router.post('/getHomeShuffle', controller.wx.home.getHomeShuffle);
  router.post('/getRecommedList', controller.wx.recommed.getRecommedList);
  router.post('/getFruitDetail', controller.wx.recommed.getFruitDetail);
  router.post('/wxlogin', controller.wx.login.wxLogin);

  //TODO 业务支撑
  router.post('/addFruitType', controller.support.fruitType.addFruitType);
  router.post('/changeFruitType', controller.support.fruitType.changeFruitType);
  router.post('/fruitTypeList', controller.support.fruitType.fruitTypeList);
  router.post('/putFruitInfo', controller.support.fruitType.putFruitInfo);
  router.post('/register', controller.support.register.registerCon);
  router.post('/login', controller.support.register.loginCon);


  //TODO 公用
  router.post('/singleUpload', controller.upload.singleUpload);
};
