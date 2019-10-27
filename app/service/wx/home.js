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

        // SELECT lf.fid, lf.name, lfu.md5_name, lf.price, lf.cur_price, lf.sold_nums, lf.star_rate, lf.introduce  FROM lwh_fruit AS lf, lwh_file_upload AS lfu WHERE lf.image_url = lfu.md5_code;
        try {
            let res = await app.mysql.query(`
                SELECT
                    lf.fid,
                    lf.name,
                    lfu.md5_name,
                    lf.price,
                    lf.cur_price,
                    lf.sold_nums,
                    lf.star_rate,
                    lf.introduce 
                FROM
                    lwh_fruit AS lf,
                    lwh_file_upload AS lfu 
                WHERE
                    lf.image_url = lfu.md5_code
                limit ?,?;`,
                [startIndex, endIndex])

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