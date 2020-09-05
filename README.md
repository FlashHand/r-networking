# r-networking使用手册
## service_providers
###介绍：
####目录结构：
```
r-networking
├── api_clients
│   ├── BasicClient
│   ├── DashboardClient
│   ├── MWSlotsManager.js
│   ├── PhpClient
│   └── SaasClient
├── index.js
├── middlewares
│   ├── common
│   └── saas
├── networking_utils
│   ├── dashboard.js
│   ├── php.js
│   └── saas.js
├── package.json
└── service_providers
    ├── index.js
    ├── service_account
    ├── service_agency
    ├── service_common
    ├── service_crm
    ├── service_crm-customer
    ├── service_crm-order
    ├── service_crm-pool
    ├── service_finance
    ├── service_invoice
    ├── service_market
    ├── service_message-center
    ├── service_our
    ├── service_partner
    ├── service_product
    ├── service_product-center
    ├── service_pub-partner
    ├── service_report
    ├── service_serverless
    ├── service_serverless-package
    ├── service_tenant
    └── service_tenant-console
```
####目录功能
**1. api_clients:**



####命名规范
####使用：
```js
const rnet = require('r-networking');
//申明一个api函数
const checkUser = (params)=>{
  //完整的url是/our/v1//user_info_get
  return rnet.services_providers.our_v1.client.createGet('/user_info_get', params);
}
//使用api函数
async function useCheckUser(params){
  try{
      let res = await checkUser(params);
    }catch (e){

    }
}
```
