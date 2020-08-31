/**
 * 老的/api/rys
 * @authors 赛辉
 * @date    2020-08-28 16:57:37
 * @version 1.0.0
 */
const server = require("../../networking_utils/saas");
module.exports = server.generateClients("/product-center/v2", [], []);
