const httpException = require('../../util/http_exception')

module.exports = app => {
    const { validator } = app;
    const { ParamsError } = httpException

    // 校验用户名是否正确
    validator.addRule('homeBannerVal', (rule, value, arr)=>{

        if (!/^\d+$/.test(value)) {
            throw new ParamsError(`${value} params validator error`)
        }
    });
}
