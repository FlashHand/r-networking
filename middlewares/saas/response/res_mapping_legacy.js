/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = response => {
  try {
    //data不是对象时不处理
    if (typeof response.data.data != 'object' || response.data.data === null) {
      response.data.res = response.data.data;
      return response
    }
    let resBody = response.data.data;
    let resCode = response.data.code;
    let resMsg = response.data.msg;
    response.data.message = response.data.msg;
    response.data.code = parseInt(response.data.code);
    response.data.res = resBody;
    response.data.res.code = resCode;
    response.data.res.msg = resMsg;
  } catch (e) {
    console.log(e);
  }
  return response
}
const rejected = error => {
  return Promise.reject(error)
}
module.exports = {
  fullfilled,
  rejected
}
