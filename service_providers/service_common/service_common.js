/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 8:14 PM
 */
const RYSClient = require("../RYSClient");
module.exports = {
  client:new RYSClient(),
  legacyClient: new RYSClient({isLegacy: true})
};
