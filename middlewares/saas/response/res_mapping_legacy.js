/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = (response) => {
  try {
    //data不是对象时不处理
    if (typeof  response.data.data == 'number'||typeof response.data.data == 'string') return response;
    let resBody = response.data.data||{};
    let resCode = parseInt(response.data.code);
    let resMsg = response.data.msg;
    response.data.message = response.data.msg;
    response.data.code = parseInt(response.data.code);
    response.data.res = resBody;
    response.data.res.code = resCode;
    response.data.res.msg = resMsg;

    // if (resBody.list) {
    //   response.data.res = resBody.list
    //   response.data.data = resBody.list;
    //   for (let key in resBody) {
    //     if (key !== 'list') {
    //       response.data[key] = resBody[key];
    //     }
    //   }
    // }else{
    //   response.data.res = resBody;
    //   response.data.res.code = resCode;
    //   response.data.res.msg = resMsg;
    // }
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
