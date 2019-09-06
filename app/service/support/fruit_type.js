const BaseService = require('../base_serviece')

class FruitTypeService extends BaseService {

    async addTypeSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        const {name, typeId} = params

        try {
            const selRes = await app.mysql.query(
                `SELECT * FROM lwh_fruit_type WHERE name=? and type_id=?;`, [name, typeId])

            if (selRes.length > 0) {
                return this.respPackage(200, '', '该水果种类已存在')
            }

            await app.mysql.query(
                `INSERT INTO lwh_fruit_type(name, type_id, is_delete) VALUES(?, ?, ?);`, [name, typeId, '0'])
            return this.respPackage(200, '', '添加成功')
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

    async changeTypeSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        const {name, typeId} = params

        try {
            const selRes = await app.mysql.query(
                `SELECT * FROM lwh_fruit_type WHERE type_id=?;`, [typeId])

            if (selRes.length === 0) {
                return this.respPackage(200, '', '该水果种类不存在')
            }

            await app.mysql.query(
                `UPDATE lwh_fruit_type SET name=? WHERE type_id=?;`, [name, typeId])
            return this.respPackage(200, '', '修改成功')
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

    async typeListSer() {
        const {app} = this
        const {ServieceError} = app.errors.httpException

        try {
            const selRes = await app.mysql.query('SELECT * FROM lwh_fruit_type')

            return this.respPackage(200, selRes)
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }

    async putFruitInfoSer(params) {
        const {app} = this
        const {ServieceError} = app.errors.httpException
        const {name, imgUrl, price, curPrice, introduce, fruitType, content} = params

        try {
            const selRes = await app.mysql.query(
                `SELECT * FROM lwh_fruit WHERE name=?;`, [name])
            if (selRes.length > 0) {
                return this.respPackage(200, '', '该水果已存在')
            }

            const fileUploadRes = await app.mysql.query(
                `SELECT * FROM lwh_file_upload WHERE md5_code=?;`, [imgUrl])
            if (fileUploadRes.length === 0) {
                return this.respPackage(200, '', '请选择图片')
            }

            await app.mysql.query(
                `INSERT INTO lwh_fruit(name, image_url, price, cur_price, sold_nums,
                 star_rate, introduce, fruit_type, update_date, is_delete, content)
                  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [name, imgUrl, price, curPrice, '0', '0', introduce, fruitType, new Date(), '0', content])
            return this.respPackage(200, '', '添加成功')
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }
}

module.exports = FruitTypeService