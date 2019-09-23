const BaseService = require('../base_serviece')
const handleToken = require('../../../util/handle_token')
const axios = require('axios')
const qs = require('qs')

class LoginService extends BaseService {

    async wxLoginSer(params) {
        const {app, ctx} = this
        const {ServieceError} = app.errors.httpException
        const {code=''} = params
        const conn = await app.mysql.beginTransaction()

        //todo 在wx获取的code， 放在wx api中
        //todo  GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        const qsUrl = qs.stringify({
            appid: app.config.wxConfig.appId,
            secret: app.config.wxConfig.appSecret,
            js_code: code
        })
        const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&${qsUrl}`
        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new ServieceError('openid获取失败')
        }
        const {errcode, errmsg} = result.data
        if (errcode){
            throw new ServieceError('openid获取失败:'+errmsg)
        }

        try {
            const openId = result.data.openid
            let selRes = await app.mysql.query(
                `SELECT * FROM lwh_register WHERE open_id=?;`, openId)

            if (selRes.length === 0) {
                //todo 如果查询不到openId 直接将openId插入
                await conn.query(
                    `INSERT INTO lwh_register(username, password, type, create_date, open_id) VALUES(?, ?, ?, ?, ?);`,
                    ['', '', 'user', new Date(), openId])
                selRes = await conn.query(
                    `SELECT * FROM lwh_register WHERE open_id=?;`, openId)
                conn.commit()
            }

            const userLevel =  app.config.authLevel[selRes[0].type]
            const token = handleToken.generateToken(app, selRes[0].id, userLevel)
            return this.respPackage(200, {token})
        }catch (e) {
            conn.rollback()
            throw new ServieceError(e.message)
        }
    }
}

module.exports = LoginService