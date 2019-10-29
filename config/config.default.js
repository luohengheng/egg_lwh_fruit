/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1565059317497_9990';

    // add your middleware config here
    config.middleware = ['notfoundHandler', 'auth'];

    // 关闭csrf
    config.security = {
        csrf: {
            enable: false,
        },
    };

    // 白名单接口
    config.authWhiteList = [
        '/getHomeBanner', '/getHomeInfo', '/getHomeShuffle', '/getRecommedList', '/register',
        '/login', '/getFruitDetail', '/wxlogin'
    ];

    // 目前定义三种用户级别
    config.authLevel = {
        user: 8,
        admin: 15,
        sup: 18
    }

    // todo wx登录验证(appSecret, appId)参数
    config.wxConfig = {
        appSecret: 'e91b53c889558106906a292c56f5e722',
        appId: 'wxcb391c5b020a69ae'
    }

    // 设置token生成的key 和token生效时间
    config.secret = {
        secretKey: 'lwh',
        expiresIn: '12h'
    }

    // 配置本地ip方便调试
    config.addr = 'localhost'

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    const onerror = {
        all(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            ctx.body = JSON.stringify({
                code: 'E99999',
                msg: '服务器出错',
                status: 500
            })
            ctx.status = 500;
        },
    }

    // mysql配置
    const mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
            // 数据库名
            database: 'my_fruit',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    // 开启跨域
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };

    return {
        ...config,
        ...userConfig,
        mysql,
        onerror,
    };
};
