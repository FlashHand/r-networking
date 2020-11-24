# r-networking 1.0.19
## 如何创建一个API
注意：随着码平台统一带来的接口风格统一，r-networking会直接提供client,不用再基于新老兼容的形式去开发。

备注：r-api统一申明接口（接口自动化编码开发中）

**接口文件注意按照微服务分类,目录规范：**
1. api目录命名统一为rys-api
2. api依据微服务名做分类
3. js统一采用下划线（配合js命名规范）
```shell script
src/rys-api
├── crm_customer.js
├── index.js
├── message_center_v2.js
├── our_v1.js
└── our_v2.js
```

**创建API步骤：**
- 创建src/r-api文件，然后创建一个r-api/our_v2.js
- 在our_v2.js中添加
```javascript
const rClient = require('r-networking').client;
//创建get请求,application/x-www-form-urlencoded
const pubAreaVersion = ()=>{
  return rClient.createGet('our/v2/pub/area/version')
}
//创建post请求用：application/json
const createNewCompany = ()=>{
  return rClient.createPostJSON('our/v2/newCompany')
}
module.exports = {
  pubAreaVersion,
  createNewCompany
}
```
- 把our_v2添加到r-api/index.js中
```javascript
const our_v2 = require('./our_v2');
module.exports = {
  our_v2
}
```
- 执行请求
```javascript
const rApi = require('path to r-api');
//执行请求
const requestPubAreaVersion = async ()=>{
  let res = await rApi.our_v2.pub_area_version();
  return res;
}
```

## 如何基于微服务创建一个API
不强制使用，此功能以后只服务于特殊场景(如新网关鉴权)
基于微服务的好处是：
1. 提供更灵活的中间件作用域

```javascript
const our_v2 = require('r-networking').service_providers.our_v2;
const pubAreaVersion = ()=>{
//此处不需要再写/our/v2
  our_v2.client.createGet('/pub/area/version')
}
```

## r-networking进阶使用
#### A. 中间件插槽
#### B. 创建一个service_provider

## r-networking的设计与维护
