## 介绍
首先这是一个后台由egg开发的，前台目前包括微信小程序，后期会分别加上vue, react 版本的后台管理系统

项目主要还是为了练习当前叙述的这些技术，有出现bug希望多多指出
这个项目是一个开发水果商城的一个系统

## 项目参数配置
1. confing/config.default.js配置
    1. config.wxConfig中appSecret和appId分别需要你在微信小程序里面获取
    2. config.secret中secretKey是生成token的key，expiresIn是token存活时间
    3. config.addr是方便本地调试配置的服务器地址
    4. const mysql数据库配置

## 目前开发的功能
1. 定义所有接口参数校验，通过app的load加载整个校验文件夹加载到app中
2. 定义自己业务类型报错，通过定义各种类型httpError继承error,填写错误类型和错误信息，通过app的load加载整个业务类型文件夹，存放在app中
3. 404 拦截报错处理
4. egg-error开启未捕获错误进行兜底 统一报500错误，
5. mysql事务日志回滚(建议使用手动回滚，颗粒度比较细)
6. 开启报错信息日志
7. 文件上传 (stream方式来接收)
8. bcryptjs在账号注册，密码10级加盐
9. jsonwebtoken生成token，配置秘钥，token参数，生成接口token校验，添加token白名单接口
10. 在token生成中会添加个人权限(目前有三种权限: 1. 普通用户 2. 管理员 3. 超级管理员) 根据不同权限能访问不同权限接口
11. 解决跨域


## 接口
1. 首页的三个接口
    1. 消息通知
    2. 首页轮播图数据
    3. 水果数据列表分页查询
2. 推荐页
    1. 推荐页水果分类列表
    2. 推荐页水果详情页
3. 用户
    1. 注册
    2. 登录(wx: openId登录 后台账号：用户名&密码登录)
4. 购物车
    1. 购物车提交生成订单，记录商品信息快照
4. 后台
    1. 添加水果种类
    2. 添加水果种类列表
    3. 编辑水果种类
    4. 添加水果二级详情
5. 其他
    1. 文件上传


### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```