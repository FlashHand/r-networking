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
  console.log(error.message);
  if (error.message.indexOf('timeout')>=0&&error.message.indexOf('exceeded')>=0){
    return {data:{code:'-12800', msg: '请求超时'}}
  }
  return Promise.reject(error)
}
module.exports = {
  name: 'res_handler',
  fullfilled,
  rejected
}
