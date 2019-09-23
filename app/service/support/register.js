const bcrypt = require('bcryptjs')
const BaseService = require('../base_serviece')
const handleToken = require('../../../util/handle_token')

class RegisterService extends BaseService {

    async registerSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        const {username='', password=''} = params
        const salt = bcrypt.genSaltSync(10)
        const saltPwd = bcrypt.hashSync(password, salt)

        try {
            const selRes = await app.mysql.query(
                `SELECT * FROM lwh_register WHERE username=?;`, username)

            if (selRes.length > 0) {
                return this.respPackage(200, '', '账号已存在')
            }

            //todo type 'user' 普通注册，'admin' 管理员, 'sup' 超级管理员, 'wx' 微信小程序,
            await app.mysql.query(
                `INSERT INTO lwh_register(username, password, type, create_date, open_id) VALUES(?, ?, ?, ?, ?);`,
                [username, saltPwd, '01', new Date(), ''])
            return this.respPackage(200, '', '添加成功')
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

    async loginSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        const {username='', password=''} = params

        try {
            const selRes = await app.mysql.query(
                `SELECT * FROM lwh_register WHERE username=?;`, username)

            if (selRes.length === 0) {
                return this.respPackage(200, '', '账号不存在')
            }

            const comparePwd = bcrypt.compareSync(password, selRes[0].password)
            if (!comparePwd) {
                return this.respPackage(200, '', '密码错误')
            }

            const userLevel =  app.config.authLevel[selRes[0].type]
            const token = handleToken.generateToken(app, selRes[0].id, userLevel)
            return this.respPackage(200, {token})
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

}

module.exports = RegisterService