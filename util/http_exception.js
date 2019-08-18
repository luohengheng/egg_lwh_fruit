class ServieceError extends Error{
    constructor(msg='服务器内部错误',code='E99999',status='500') {
        super()
        this.msg = msg
        this.code = code
        this.status = status
    }
}

class ParamsError extends Error{
    constructor(msg='参数值错误',code='E19999',status='400') {
        super()
        this.msg = msg
        this.code = code
        this.status = status
    }
}

module.exports = {
    ServieceError,
    ParamsError
}