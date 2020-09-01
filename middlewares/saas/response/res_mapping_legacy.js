/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = response => {
  try {
    let resBody = response.data.data || {}
    //后端有时会不返回data，在这时我们需要手动把data设为{}
    response.data.data = resBody;
    let resCode = parseInt(response.data.code)
    let resMsg = response.data.msg
    response.data.message = response.data.msg
    response.data.code = parseInt(response.data.code)
    response.data.res = resBody
    response.data.res.code = resCode
    response.data.res.msg = resMsg
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
    // eslint-disable-next-line
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
