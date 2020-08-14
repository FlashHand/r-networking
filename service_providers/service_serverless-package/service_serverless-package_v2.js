/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 8:14 PM
 */
const networking_utils = require('../networking_utils');
const res_after_mapping_term = require('../../middlewares/response/res_after_mapping_term')
module.exports = networking_utils.generateClients('/serverless-package/v2',[],[res_after_mapping_term]);
