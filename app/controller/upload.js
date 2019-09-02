const Controller = require('egg').Controller;

class UploadController extends Controller {
    async singleUpload() {

        const { ctx, service } = this
        const res = await service.upload.getUploadFileSer()
        ctx.body = res
    }
}

module.exports = UploadController