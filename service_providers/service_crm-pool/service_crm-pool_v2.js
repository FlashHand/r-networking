/*
 * @Author: 冯丹凤
 * @Date: 2020-08-25 11:20:27
 * @LastEditors: 冯丹凤
 * @LastEditTime: 2020-08-26 20:33:05
 * @Description: 原 /rys-crm-pool 转成 /crm-pool
 */

const saas = require('../../networking_utils/saas');
module.exports = saas.generateClients('/crm-pool');
