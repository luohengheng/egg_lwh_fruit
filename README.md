## 介绍
首先这是一个后台由egg开发的，前台目前包括微信小程序，后期会分别加上vue, react 版本的后台管理系统

项目主要还是为了练习当前叙述的这些技术，有出现bug希望多多指出
这个项目是一个开发水果商城的一个系统

## 目前开发的功能
1. 全局异常捕获
2. 分别对400的异常 和500的异常处理， 事务日志回滚
3. 报错信息日志
4. 请等待

## 接口
1. 首页的三个接口
    1. 消息通知
    2. 首页轮播图数据
    3. 水果数据列表分页查询
2. 请等待


### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```