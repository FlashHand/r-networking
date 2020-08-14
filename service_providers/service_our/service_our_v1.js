/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 8:14 PM
 */
const RYSClient = require("../RYSClient");
module.exports = {
  client:new RYSClient({service:'/our/v1'}),
  legacyClient: new RYSClient({service: '/our/v1', isLegacy: true})
};

