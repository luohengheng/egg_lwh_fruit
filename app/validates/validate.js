const httpException = require('../../error/http_exception')

module.exports = app => {
    const { validator } = app;
    const { ParamsError } = httpException

    // 校验用户名是否正确
    validator.addRule('homeBannerVal', (rule, value, arr)=>{

        if (!/^\d+$/.test(value)) {
            throw new ParamsError(`${value} params validator error`)
        }
    });

    // 校验数组是否为空
    validator.addRule('checkArr', (rule, value, arr)=>{

        if (Object.prototype.toString.call(value) !== '[object Array]' || value.length === 0) {
            throw new ParamsError(`${value} params validator error`)
        }
    });
}
