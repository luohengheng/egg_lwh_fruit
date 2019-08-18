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
  config.middleware = ['notfoundHandler'];

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const onerror = {
      all(err, ctx) {
          // 在此处定义针对所有响应类型的错误处理方法
          // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
          ctx.body = JSON.stringify({
                  error: 'E99999',
                  msg: '服务器出错',
                  status: 500
          })
          ctx.status = 500;
      },
  }

  //mysql配置
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

  return {
      ...config,
      ...userConfig,
      mysql,
      onerror,
  };
};