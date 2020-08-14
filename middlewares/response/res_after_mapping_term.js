/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */

const fullfilled = (response) => {
  try {
    if (response.config.url.indexOf('/api/accountinfo/get/days/')>=0
    ||response.config.url.indexOf('/api/currencyInfoRpc/getCurrencyInfoMap')>=0){
      delete response.data.res.code;
      delete response.data.res.msg;
    }
  } catch (e) {

  }
  return response;
};
const rejected = (error) => {
  return Promise.reject(error);
};
module.exports =  {
  fullfilled,
  rejected
}
