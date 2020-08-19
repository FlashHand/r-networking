/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/8 2:55 PM
 */
const SaasClient = require("../api_clients/SaasClient");
const res_mapping_legacy = require('../middlewares/saas/response/res_mapping_legacy');

let default_request_mws = [];
let default_response_mws = [];

const addDefaultReqMiddleware = (request_mw,tailing=true) => {
  if (tailing){
    default_request_mws.push(request_mw);
  }else{
    default_request_mws.unshift(request_mw);
  }
};
const addDefaultResMiddleware = (response_mw,tailing=true) => {
  if (tailing){
    default_response_mws.push(response_mw);
  }else{
    default_response_mws.unshift(response_mw);
  }
};
const generateClients = (service = '',request_mws=[],response_mws=[]) => {
  request_mws = default_request_mws.concat(request_mws);
  response_mws = default_response_mws.concat(response_mws);
  response_mws.unshift(res_mapping_legacy);

  return {
   client:new SaasClient({service},request_mws,response_mws),
   legacyClient: new SaasClient({service},request_mws,response_mws)
 }
};
module.exports = {
  generateClients,
  addDefaultReqMiddleware,
  addDefaultResMiddleware
}
