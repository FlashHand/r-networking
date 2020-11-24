/**
 * @Description @ignore
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = response => {
  try {
    //data 是undefined时设为空对象
    if (response.data.data === undefined) response.data.data = {};
    response.data.code = parseInt(response.data.code);
  } catch (e) {
    console.log(e);
  }
  return response
}
const rejected = error => {
  return Promise.reject(error)
}
module.exports = {
  name: 'res_handler',
  fullfilled,
  rejected
}
