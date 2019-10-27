const Controller = require('egg').Controller;

class RegisterController extends Controller {

    async registerCon() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                username: 'string',
                password: /^1\d+$/
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.support.register.registerSer(params)
        ctx.body = res
    }

    async loginCon() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                username: 'string',
                password: 'string'
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.support.register.loginSer(params)
        ctx.body = res
    }
}

module.exports = RegisterController;
