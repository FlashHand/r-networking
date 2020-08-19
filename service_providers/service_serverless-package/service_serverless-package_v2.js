/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 8:14 PM
 */
const saas = require('../../networking_utils/saas');
const res_after_mapping_term = require('../../middlewares/saas/response/res_after_mapping_term')
module.exports = saas.generateClients('/serverless-package/v2',[],[res_after_mapping_term]);
