
module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next();
        if (ctx.status === 404) {
            ctx.body = {
                error: 'E19999',
                msg: {
                    url: ctx.url,
                    method: ctx.method,
                    info: 404
                },
                status: 404
            }
        }
    };
};