const path = require('path');

class AppBootHook {

    constructor(app) {
        this.app = app;
    }

    //todo 配置文件即将加载，这是最后动态修改配置的时机
    configWillLoad() {
        // 此时 config 文件已经被读取并合并，但是还并未生效
        // 这是应用层修改配置的最后时机
        // 注意：此函数只支持同步调用
    }

    //todo 文件加载完成
    async didLoad() {
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务

        // 加载所有的校验规则
        const valDirectory = path.join(this.app.config.baseDir, 'app/validate');
        this.app.loader.loadToApp(valDirectory, 'validate');
        // 加载所有异常类型
        const errDirectory = path.join(this.app.config.baseDir, 'error')
        this.app.loader.loadToApp(errDirectory, 'errors')
        // 加载用户权限
        const permDirectory = path.join(this.app.config.baseDir, 'util/permission')
        this.app.loader.loadToApp(permDirectory, 'perm')
    }

    //todo 插件启动完毕
    async willReady() {
        // 所有的插件都已启动完毕，但是应用整体还未 ready
        // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    }

    //todo worker 准备就绪
    async didReady() {
        // 应用已经启动完毕
    }

    //todo 应用启动完成
    async serverDidReady() {
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例
    }
}

module.exports = AppBootHook;