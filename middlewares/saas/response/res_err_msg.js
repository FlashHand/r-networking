/**
 * @Description
 * @author zhaoshu
 * @date 2020/8/7 11:10 AM
 */

const fullfilled = response => {
  try {
    if (response.data.code == 0) {
      response.data.err_code = 1
    } else {
      response.data.err_code = Number(response.data.code)
    }
    response.data.err_msg = response.data.msg
    return response
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
