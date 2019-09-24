const Controller = require('egg').Controller;

class OrderController extends Controller {

    async wxGenOrder() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                cartData: 'checkArr',
                total_price: 'string'
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.wx.order.wxOrderSer(params)
        ctx.body = res
    }
}

module.exports = OrderController;
