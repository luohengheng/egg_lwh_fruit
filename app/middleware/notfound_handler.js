module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        try {
            await next();
        }catch (e) {
            if (e.status && e.status === '500') {
                ctx.body = {
                    error: e.code,
                    msg: {
                        url: ctx.url,
                        method: ctx.method,
                        data: ctx.app.config.env === 'prod' ? 'Internal Server Error' : e.msg
                    },
                    status: e.status
                }
            }else {
                ctx.body = {
                    error: 'E19999',
                    msg: {
                        url: ctx.url,
                        method: ctx.method,
                        data: e.msg
                    },
                    status: 404
                }
            }
        }
    };
};