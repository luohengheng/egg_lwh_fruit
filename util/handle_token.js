const jwt = require('jsonwebtoken')

const generateToken = (app, uid, scope, ) => {
    const {secretKey, expiresIn} = app.config.secret

    return jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn
    })
}

module.exports = {
    generateToken
}