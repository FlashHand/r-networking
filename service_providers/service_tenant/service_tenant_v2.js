const server = require("../../networking_utils/saas")
/**
 * 对应老接口/tenant-console/tenant/ 以及 /tenant/
 *
 */
module.exports = server.generateClients("/tenant-console/v2")
