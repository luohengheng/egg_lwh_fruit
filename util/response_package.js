
module.exports = (code, data) => {
    switch (code) {
        case 200:
            return {
                error: 'S10000',
                msg: '',
                data: {
                  data
                },
                status: 200
            }
        default:
            break
    }
}