/**
 * @Description
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/8/7 11:10 AM
 */
let subResMWs = [];
const fullfilled = (response) => {
  let finalResponse = response;
  for(let mw of subResMWs){
    finalResponse = mw.fullfilled(response);
  }
  return finalResponse;
};
const rejected = (error) => {
  return Promise.reject(error);
};
const set = (mws)=>{
  subResMWs = mws;
}
module.exports = {
  fullfilled,
  rejected,
  set
}
