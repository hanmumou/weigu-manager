import { post, GET, patch } from '@/utils/request'

// 添加运动积分
export const addmotor = (banner_img, every_step_exchange_integral, integral, is_value_card, is_coupon, integral_list_json, explain) => post('api/integral', {
  banner_img,
  every_step_exchange_integral,
  integral,
  is_value_card,
  is_coupon,
  integral_list_json,
  explain
})

// 获取运动积分列表
export const motorlist = () => GET('api/integral')

// 修改运动积分列表
export const updatemotorlist = (banner_img, every_step_exchange_integral, is_value_card, is_coupon, integral_list_json, explain) => patch('api/integral/',{
  banner_img,
  every_step_exchange_integral,
  is_value_card,
  is_coupon,
  integral_list_json,
  explain
})
