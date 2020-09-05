const res_after_mapping_term = require('../../middlewares/saas/response/res_after_mapping_term')
const saas = require('../../networking_utils/saas');
module.exports = saas.generateClients('/finance/v2',[],[res_after_mapping_term]);

