/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/8 2:55 PM
 */
const RYSClient = require("./RYSClient");

const generateClients = (service = '',request_mws=[],response_mws=[]) => {
 return {
   client:new RYSClient({service},request_mws,response_mws),
   legacyClient: new RYSClient({service, isLegacy: true},request_mws,response_mws)
 }
};
module.exports = {
  generateClients
}
