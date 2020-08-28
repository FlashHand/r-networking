const server = require("../../networking_utils/saas")
const res_err_msg = require("../../middlewares/saas/response/res_err_msg")
/**
 * /product-center/api/v1/ -> /product-center/v2/
 * /api/rys/ -> /product-center/v2/
 */
module.exports = server.generateClients("/product-center/v2",[] ,[ ]);
