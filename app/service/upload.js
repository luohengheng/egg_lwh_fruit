const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const md5 = require('md5');
const awaitWriteStream = require('await-stream-ready').write;
const BaseService = require('./base_serviece')

class UploadService extends BaseService {
    async getUploadFileSer() {
        const {ctx, app} = this
        const {ServieceError} = app.errors.httpException

        const stream = await ctx.getFileStream()

        //新建一个文件名 md5中将文件名+时间戳
        const md5Name = md5(stream.filename + (new Date()).getTime())
        const filename = md5Name + path
            .extname(stream.filename)
            .toLocaleLowerCase();

        //生成目标文件
        const target = path.join('app/public/uploads', filename);

        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);

        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (e) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw new ServieceError(e.message);
        }


        try {
            await app.mysql.query(
                `INSERT INTO lwh_file_upload ( filename, md5_name, md5_code ) VALUES( ?, ?, ? );`,
                [stream.filename, filename, md5Name])

            return this.respPackage(200, {code: md5Name})
        }catch (e) {
            throw new ServieceError(e.message)
        }
    }
}

module.exports = UploadService