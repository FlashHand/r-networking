/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = response => {
  try {
    let resBody = response.data.data || {}
    let resCode = parseInt(response.data.code)
    let resMsg = response.data.msg
    response.data.message = response.data.msg
    response.data.code = parseInt(response.data.code)
    response.data.res = resBody
    response.data.res.code = resCode
    response.data.res.msg = resMsg
    // eslint-disable-next-line 
  } catch (e) {}
  return response
}
const rejected = error => {
  return Promise.reject(error)
}
module.exports = {
  fullfilled,
  rejected
}
