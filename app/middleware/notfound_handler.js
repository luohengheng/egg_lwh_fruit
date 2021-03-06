module.exports = (options, app) => {
    return async function (ctx, next) {
        try {
            await next(options);
        }catch (e) {
            if (e.status && e.status === '500') {
                ctx.body = {
                    code: e.code,
                    msg: {
                        url: ctx.url,
                        method: ctx.method,
                        data: ctx.app.config.env === 'prod' ? 'Internal Server Error' : e.msg
                    },
                    status: e.status
                }
            }else if (e.status && e.status === '400') {
                ctx.body = {
                    code: e.code,
                    msg: {
                        url: ctx.url,
                        method: ctx.method,
                        data: e.msg
                    },
                    status: e.status
                }
            }else {
                ctx.body = {
                    code: 'E19999',
                    msg: {
                        url: ctx.url,
                        method: ctx.method,
                        data: e.msg
                    },
                    status: 200
                }
            }
        }
    };
};