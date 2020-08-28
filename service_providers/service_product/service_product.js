const server = require("../../networking_utils/saas")
const res_err_msg = require("../../middlewares/saas/response/res_err_msg")
/**
 * 老接口 /rys-product
 *
 */
module.exports = server.generateClients("/product/v2",[] ,[ ]);
