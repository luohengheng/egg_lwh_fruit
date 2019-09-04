const { Service } = require('egg');

class BaseService extends Service{

    respPackage(code, data, msg = '') {
        switch (code) {
        case 200:
            return {
                code: 'S10000',
                msg,
                data: {
                    data
                },
                status: 200
            }
        default:
            break
        }
    }
}

module.exports = BaseService