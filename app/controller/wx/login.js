const Controller = require('egg').Controller;

class RegisterController extends Controller {

    async wxLogin() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                code: 'string',
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.wx.login.wxLoginSer(params)
        ctx.body = res
    }
}

module.exports = RegisterController;
