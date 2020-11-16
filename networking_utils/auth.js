const AuthClient = require("../api_clients/AuthClient");
const resHandler = require('../middlewares/auth/response/res_handler');
const generateClients = (service = '', request_mws = [], response_mws = []) => {
  response_mws.unshift(resHandler);
  return new AuthClient({service}, request_mws, response_mws);
};
module.exports = {
  generateClients
}
