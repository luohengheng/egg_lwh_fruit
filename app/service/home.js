const BaseService = require('./base_serviece')

class HomeService extends BaseService {
    async getHomeBannerSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        let {pageSize = 1, pageNum = 5} = params

        pageSize = Number.parseInt(pageSize)
        pageNum = Number.parseInt(pageNum)
        const startIndex = pageNum * (pageSize - 1)
        const endIndex = pageNum

        try {
            let res = await app.mysql.query('select * from lwh_fruit limit ?,?',
                [startIndex, endIndex])
            res = res.map(i => {
                return {
                    ...i,
                    image_url: `http://localhost:7001/public/img/${i.image_url}`
                }
            });

            return this.respPackage(200, res)
        }catch (e) {
            throw  new ServieceError(e.message)
        }

        //todo 开启事务
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        // const result = await app.mysql.beginTransactionScope(async conn => {
            // await conn.query('UPDATE lwh_fruit SET price=?  WHERE id = ?;', [60, 1])
            // await conn.query('UPDATE lwh_fruit SET price=?  WHERE id = ?;', [40, 2])
            // return res;
        // }, ctx);
        // return result
    }

    async getHomeInfoSer() {
        const {app} = this
        const {ServieceError} = app.errors.httpException

        try {
            const res = await app.mysql.query('select * from lwh_message')
            return this.respPackage(200, res)
        }catch (e) {
            throw new new ServieceError(e.message)
        }
    }

    async getHomeShuffleSer() {
        const {app} = this
        const {ServieceError} = app.errors.httpException

        try {
            const res = await app.mysql.query('select * from lwh_shuffle')
            return this.respPackage(200, res)
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }
}

module.exports = HomeService;