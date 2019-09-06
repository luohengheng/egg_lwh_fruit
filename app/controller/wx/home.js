const Controller = require('egg').Controller;

class HomeController extends Controller {

  async getHomeBanner() {
      const { ctx, service } = this
      const params = ctx.request.body

      ctx.validate({
          pageSize: 'homeBannerVal',
          pageNum: 'homeBannerVal',
      })

      const res = await service.wx.home.getHomeBannerSer(params)
      ctx.body = res
  }

  async getHomeInfo() {
    const { ctx, service } = this;
      const res = await service.wx.home.getHomeInfoSer()
      ctx.body = res
  }

  async getHomeShuffle() {
    const { ctx, service } = this;
      const res = await service.wx.home.getHomeShuffleSer()
      ctx.body = res
  }
}

module.exports = HomeController;
