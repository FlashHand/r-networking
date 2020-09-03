/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const BasicClient = require('../BasicClient');
const MWSlotsManager = require('../MWSlotsManager');
const mw_slots_manager = new MWSlotsManager();
const mw_slots_manager_legacy = new MWSlotsManager();

class SaasClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    if(config.isLegacy){
      request_mws.unshift(mw_slots_manager_legacy.req_pre);
      request_mws.push(mw_slots_manager_legacy.req_sub);
      response_mws.unshift(mw_slots_manager_legacy.res_pre);
      response_mws.push(mw_slots_manager_legacy.res_sub);
    }else{
      request_mws.unshift(mw_slots_manager.req_pre);
      request_mws.push(mw_slots_manager.req_sub);
      response_mws.unshift(mw_slots_manager.res_pre);
      response_mws.push(mw_slots_manager.res_sub);
    }
    super(config, request_mws, response_mws)
  }
}

SaasClient.mw_slots_manager = mw_slots_manager;
SaasClient.mw_slots_manager_legacy = mw_slots_manager_legacy;

module.exports = SaasClient;
