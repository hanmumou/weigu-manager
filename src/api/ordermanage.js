import { GET, post,delate } from '@/utils/request'

// 获取订单列表
export const getorderlist = () => GET('api/orders')

// 公共接口
export const getcourierlist = () => post('api/orders/express/company')

// 获取订单统计
export const getsaleslist = () => post('api/orders/analyze')

// 微信退款
export const wechatRefund = (order_id) => post('api/pay/refund', {
  order_id
})
//根据省市 获取市
export const getPro = (type,data) => post('api/area',{
	type,
	data
})

// 订单发货
export const SetDelivery = (express_company_code, express_no, order_id) => post('api/orders/deliver', {
  express_company_code,
  express_no,
  order_id
})
//订单删除接口
export const delOrder =(id) => delate ('api/orders/'+id)

//获取团长姓名
export const getCommander = ()=>GET('api/regimental-commander')
