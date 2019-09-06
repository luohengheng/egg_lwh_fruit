const Controller = require('egg').Controller;

class FruitTypeController extends Controller {

    /**
     * 添加水果种类
     * @returns {Promise<void>}
     */
    async addFruitType() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                name: 'string',
                typeId: /^\d+$/
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.support.fruitType.addTypeSer(params)
        ctx.body = res
    }

    /**
     * 修改水果种类
     * @returns {Promise<void>}
     */
    async changeFruitType() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                name: 'string',
                typeId: /^\d+$/
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.support.fruitType.changeTypeSer(params)
        ctx.body = res
    }

    /**
     * 获取水果列表
     * @returns {Promise<void>}
     */
    async fruitTypeList() {
        const { ctx, service } = this
        const res = await service.support.fruitType.typeListSer()
        ctx.body = res
    }

    /**
     * 填写水果二级详情
     * @returns {Promise<void>}
     */
    async putFruitInfo() {
        const { ctx, service, app } = this
        const {ParamsError} = app.errors.httpException
        const params = ctx.request.body

        try {
            await ctx.validate({
                name: 'string',
                imgUrl: 'string',
                price: 'string',
                curPrice: 'string',
                introduce: 'string',
                fruitType: 'string',
                content: 'string',
            })
        }catch (e) {
            throw new ParamsError(e.errors)
        }

        const res = await service.support.fruitType.putFruitInfoSer(params)
        ctx.body = res
    }
}

module.exports = FruitTypeController