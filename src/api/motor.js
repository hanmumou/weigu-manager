import { post, GET, patch } from '@/utils/request'

// 添加运动积分
export const addmotor = (banner_img, step_number, integral, is_value_card, is_coupon, integral_list_json, explain) => post('api/integral', {
  banner_img,
  step_number,
  integral,
  is_value_card,
  is_coupon,
  integral_list_json,
  explain
})

// 获取运动积分列表
export const motorlist = () => GET('api/integral')

// 修改运动积分列表
export const updatemotorlist = (id, banner_img, step_number, integral, is_value_card, is_coupon, integral_list_json, explain) => patch('api/integral/' + id + '?banner_img=' + banner_img + '&step_number=' + step_number +
'&integral=' + integral + '&is_value_card=' + is_value_card + '&is_coupon=' + is_coupon + '&integral_list_json=' +
integral_list_json + '&explain=' + explain
)
