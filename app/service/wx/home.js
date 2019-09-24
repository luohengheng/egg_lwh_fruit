const BaseService = require('../base_serviece')

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
                    image_url: `http://${app.config.addr}:7001/public/img/${i.image_url}`
                }
            });

            return this.respPackage(200, res)
        }catch (e) {
            throw  new ServieceError(e.message)
        }
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