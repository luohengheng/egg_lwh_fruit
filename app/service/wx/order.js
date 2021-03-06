const BaseService = require('../base_serviece')
const axios = require('axios')
const uuid = require('node-uuid')

class WxOrderService extends BaseService {

    async wxOrderSer(params) {
        const {app, ctx} = this
        const {ServieceError} = app.errors.httpException
        const {cartData=[], total_price=''} = params
        const {uid} = ctx.auth
        const oid = uuid.v1()
        const conn = await app.mysql.beginTransaction()

        //todo o_status 待支付 支付中 已支付 已过期 4中状态 对应0-3
        //todo 现在默认停在待支付状态下
        try {
            await conn.query(
                `INSERT INTO lwh_order(uid, oid, total_price, o_status, c_date, u_date) VALUES(?, ?, ?, ?, ?, ?);`,
                [uid, oid, total_price, 0, new Date(), new Date()])

            for (let i = 0; i < cartData.length; i++) {
                await conn.query(
                    `INSERT INTO lwh_order_goods(oid, name, cur_price, introduce, content, image_url, sold_nums, c_date)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
                    [oid, cartData[i].name, cartData[i].cur_price, cartData[i].introduce, cartData[i].content,
                        cartData[i].image_url, cartData[i].sold_nums, new Date()])
            }
            conn.commit()
            return this.respPackage(200)

        }catch (e) {
            conn.rollback()
            throw new ServieceError(e.message)
        }
    }
}

module.exports = WxOrderService