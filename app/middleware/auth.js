const jwt = require('jsonwebtoken')

module.exports = (options, app) => {
    return async function (ctx, next) {
        const {NormalError} = app.errors.httpException

        // 跳过白名单接口
        if (app.config.authWhiteList.find(i => i === ctx.url)) {
            await next(options)
            return
        }

        const userToken = ctx.req.headers.authorization
        if (!userToken) {
            throw new NormalError('token无效', 'E99999', '400')
        }
        try {
            var decode = jwt.verify(userToken, app.config.secret.secretKey)
        }catch (e) {
            throw new NormalError('token已过期', 'E99999', '400')
        }
        const level = app.perm.permissions.permission[`${ctx.url}`] || 15
        if (decode.scope < level) {
            throw new NormalError('权限不足')
        }

        ctx.auth = {
            uid: decode.uid,
            scope: decode.scope
        }
        await next(options)

    }
};


