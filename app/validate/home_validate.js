const httpException = require('../../util/http_exception')

module.exports = app => {
    const { validator } = app;
    const { ParamsError } = httpException

    // 校验用户名是否正确
    validator.addRule('homeBannerVal', (rule, value)=>{
        try {
            Number.parseInt(value)
        }catch (e) {
            throw new ParamsError(`${rule.type} params validator error`)
        }
    });
}
