import { post, GET, patch } from '@/utils/request'
// 添加
export const addwechat = (miniprogram_name, payment_name, appid, appsecret, mch_id, key, apiclient_cert, apiclient_key, payment_agreement) => post('api/wechat/payment/config', {
  miniprogram_name,
  payment_name,
  appid,
  appsecret,
  mch_id, key,
  apiclient_cert,
  apiclient_key,
  payment_agreement
})
// 获取
export const getwechat = () => GET('api/wechat/payment/config', {
})
// 参数详情
export const wechatUpdate = (id, payment_name, appid, appsecret, mch_id, key, apiclient_cert, apiclient_key, payment_agreement) => patch('api/wechat/payment/config/' + id +
 '?payment_name=' + payment_name +
 '&appid=' + appid +
 '&appsecret=' + appsecret +
 '&mch_id=' + mch_id +
 '&key=' + key +
 '&apiclient_cert=' + apiclient_cert +
 '&apiclient_key=' + apiclient_key +
 '&payment_agreement=' + payment_agreement, {
})
