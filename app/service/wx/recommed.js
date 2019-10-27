const BaseService = require('../base_serviece')

class HomeService extends BaseService {
    async getRecommedListSer() {
        const {app} = this
        const {ServieceError} = app.errors.httpException

        try {
            let res = await app.mysql.query(
                `SELECT
                    lf.fid,
                    lf.name,
                    lfu.md5_name,
                    lf.price,
                    lf.cur_price,
                    lf.sold_nums,
                    lf.star_rate,
                    lf.introduce,
                    lft.NAME AS type_name 
                FROM
                    lwh_fruit AS lf,
                    lwh_fruit_type AS lft,
                    lwh_file_upload AS lfu 
                WHERE
                    lf.fruit_type = lft.type_id AND lf.image_url = lfu.md5_code;`)

            return this.respPackage(200, res)
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

    //todo 因为之前的数据随便填写，后期还需要跟 lwh_file_upload表中图片进行关联查询
    async getFruitDetailSer(params) {
        const {app} = this
        const {id} = params
        const {ServieceError} = app.errors.httpException

        try {
            let res = await app.mysql.query(
                `SELECT
                    lf.fid,
                    lf.name,
                    lfu.md5_name,
                    lf.price,
                    lf.cur_price,
                    lf.sold_nums,
                    lf.star_rate,
                    lf.introduce,
                    lf.content
                FROM
                    lwh_fruit AS lf,
                    lwh_file_upload AS lfu
                WHERE
                    lf.image_url = lfu.md5_code AND fid = ?`, [id])

            return this.respPackage(200, res)
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }
}

module.exports = HomeService