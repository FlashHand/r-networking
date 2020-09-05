/**
 * @Description sap使用的list数据处理
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = (response) => {
  try {
    let resBody = response.data.data;
    if (typeof resBody === 'object'){
      if (resBody.list) {
        response.data.res = resBody.list
        response.data.data = resBody.list;
        for (let key in resBody) {
          if (key !== 'list') {
            response.data[key] = resBody[key];
          }
        }
      }
    }
  } catch (e) {

  }
  return response;
};
const rejected = (error) => {
  return Promise.reject(error);
};
module.exports =  {
  name:'res_list_handler_legacy',
  fullfilled,
  rejected
}
