const Controller = require('egg').Controller;

class RecommedController extends Controller {

    async getRecommedList() {
        const { ctx, service } = this
        const res = await service.wx.recommed.getRecommedListSer()
        ctx.body = res
    }

    async getFruitDetail() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                id: 'string',
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.wx.recommed.getFruitDetailSer(params)
        ctx.body = res
    }
}

module.exports = RecommedController