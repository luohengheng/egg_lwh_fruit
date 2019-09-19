const BaseService = require('../base_serviece')

class HomeService extends BaseService {
    async getRecommedListSer() {
        const {app} = this
        const {ServieceError} = app.errors.httpException

        try {
            let res = await app.mysql.query(
                `SELECT
                lf.id,
                lf.NAME,
                lf.image_url,
                lf.price,
                lf.cur_price,
                lf.sold_nums,
                lf.star_rate,
                lf.introduce,
                lft.NAME AS type_name 
            FROM
                lwh_fruit AS lf,
                lwh_fruit_type AS lft 
            WHERE
                lf.fruit_type = lft.type_id;`)
            res = res.map(i => {
                return {
                    ...i,
                    image_url: `http://${app.config.addr}:7001/public/img/${i.image_url}`
                }
            });

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
                id,
                name,
                image_url,
                price,
                cur_price,
                sold_nums,
                star_rate,
                introduce,
                content
            FROM
                lwh_fruit
            WHERE
                id=?`, [id])
            res = res.map(i => {
                return {
                    ...i,
                    image_url: `http://${app.config.addr}:7001/public/img/${i.image_url}`
                }
            });

            return this.respPackage(200, res)
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }
}

module.exports = HomeService