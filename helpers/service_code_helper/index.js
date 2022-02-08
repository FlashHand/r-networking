/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/9/14 11:57 AM
 */
module.exports = {
  //码平台10000900，老版10001
  isTokenInvalid(serviceCode){
    return serviceCode === '10000900' || serviceCode == 10001;
  }
}
