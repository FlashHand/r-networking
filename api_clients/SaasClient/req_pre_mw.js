/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/20 10:35 AM
 */
let preReqMWs = [];
const fullfilled = (config) => {
  let finalConfig = config;
  for (let mw of preReqMWs){
    finalConfig = mw.fullfilled(config);
  }
  return finalConfig;
};
const rejected = (error) => {
  return Promise.reject(error);
};
const set = ()=>{
  preReqMWs = mws;
}
module.exports = {
  fullfilled,
  rejected,
  set
}
