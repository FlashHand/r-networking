/*
 * @Author: 冯丹凤
 * @Date: 2020-08-25 11:20:27
 * @LastEditors: 冯丹凤
 * @LastEditTime: 2020-08-25 11:21:24
 * @Description: 原 /rys-crm-cus 转成 /crm-customer
 */

const saas = require('../../networking_utils/saas');
module.exports = saas.generateClients('/crm-customer');
