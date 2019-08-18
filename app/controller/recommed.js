const Controller = require('egg').Controller;

class RecommedController extends Controller {
    async getRecommedList() {
        const { ctx, service } = this
        const res = await service.recommed.getRecommedListSer()
        ctx.body = res
    }
}

module.exports = RecommedController