/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const funnyList = [
  '/api/currencyInfoRpc/getCurrencyInfoMap',
  '/api/accountinfo/get/days',
  '/api/finance/actCapitalHabitSetting/getActCapitalHabitSetting',
  '/api/actInvoiceInfo/getSettleList'
]
const fullfilled = (response) => {
  try {
    const index = funnyList.findIndex((ele) => {
      return response.config.url.indexOf(ele) >= 0;
    })
    if (index >= 0) {
      delete response.data.res.code;
      delete response.data.res.msg;
      delete response.data.data.code;
      delete response.data.data.msg;

    }
  } catch (e) {

  }
  return response;
};
const rejected = (error) => {
  return Promise.reject(error);
};
module.exports = {
  fullfilled,
  rejected
}
