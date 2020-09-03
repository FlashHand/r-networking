/**
 * @Description sap使用的list数据处理
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = (response) => {
  try {
    let resBody = response.data.data||{};
    let resCode = parseInt(response.data.code);
    let resMsg = response.data.msg;
    if (resBody.list) {
      response.data.res = resBody.list
      response.data.data = resBody.list;
      for (let key in resBody) {
        if (key !== 'list') {
          response.data[key] = resBody[key];
        }
      }
    }else{
      response.data.res = resBody;
      response.data.res.code = resCode;
      response.data.res.msg = resMsg;
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
