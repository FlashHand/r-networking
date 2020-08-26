/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:46 AM
 */
const BasicClient = require('../BasicClient');
const MWSlotsManager = require('../MWSlotsManager');
const mw_slots_manager = new MWSlotsManager();

class DashboardClient extends BasicClient {
  constructor(config = {}, request_mws = [], response_mws = []) {
    request_mws.unshift(mw_slots_manager.req_pre);
    request_mws.push(mw_slots_manager.req_sub);
    response_mws.unshift(mw_slots_manager.req_pre);
    response_mws.push(mw_slots_manager.req_sub);
    super(config, request_mws, response_mws)
  }
}

DashboardClient.mw_slots_manager = mw_slots_manager;
module.exports = DashboardClient;
