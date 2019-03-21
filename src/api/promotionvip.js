import { GET, patch, post, delate } from '@/utils/request'

// 优惠券列表
export const getpromotionList = (page) => GET('api/coupon?page=' + page)

// 更改优惠券启用禁用状态
export const chanageStatus = (id, status) => patch('api/coupon/' + id + '?status=' + status)

// 增加优惠券
export const AddProList = (name, minimum_consumption, exemption_amount, num, startime_at, endtime_at, is_value_card, is_integral) => post('api/coupon', {
  name,
  minimum_consumption,
  exemption_amount,
  num,
  startime_at,
  endtime_at,
  is_value_card,
  is_integral
})

// 根据条件查询优惠券
export const searchpro = (id, name, is_value_card, startime_at, endtime_at, status) => GET('api/coupon?' +
'id=' + (typeof (id) === undefined || id == null ? '' : id) +
'&name=' + (typeof (name) === undefined || name == null ? '' : name) +
'&is_value_card=' + (typeof (is_value_card) === undefined || is_value_card == null ? '' : is_value_card) +
'&startime_at=' + (typeof (startime_at) === undefined || startime_at == null ? '' : startime_at) +
'&endtime_at=' + (typeof (endtime_at) === undefined || endtime_at == null ? '' : endtime_at) +
'&status=' + (typeof (status) === undefined || status == null ? '' : status)
)

// 删除优惠券
export const delprolist = (id) => delate('api/coupon/' + id)
