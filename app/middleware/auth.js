const jwt = require('jsonwebtoken')

module.exports = (options, app) => {
    return async function (ctx, next) {
        const {NormalError} = app.errors.httpException
        const {authWhiteList, secret:{secretKey}} = app.config
        const authorization = ctx.req.headers.authorization
        const permissionObj = app.perm.permissions.permission

        // url地址查验
        if (!Object.keys(permissionObj).find(i => i === ctx.url)) {
            throw new NormalError('url地址不存在', 'E99999', '400')
        }

        // 跳过白名单接口
        if (authWhiteList.find(i => i === ctx.url)) {
            await next(options)
            return
        }

        const userToken = authorization
        if (!userToken) {
            throw new NormalError('token无效', 'E99999', '400')
        }
        try {
            var decode = jwt.verify(userToken, secretKey)
        }catch (e) {
            throw new NormalError('token已过期', 'E99999', '400')
        }
        const level = permissionObj[`${ctx.url}`] || 15
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


