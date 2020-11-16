/**
 * @Description @ignore
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
const fullfilled = response => {
  try {
    if (response.data.code == 0) {
      return response;
    } else {
      return Promise.reject(response.data.msg);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
const rejected = error => {
  return Promise.reject(error);
}
module.exports = {
  fullfilled,
  rejected
}
