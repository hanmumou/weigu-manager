import { GET, post, patch, delate } from '@/utils/request'

// 物流管理列表
export const logistic = (page) => GET('api/delivery-lines?page=' + page)

// 添加配送线路
export const addlogistic = (driver_name, driver_phone, line_name, show_region_data, commanders_data) => post('api/delivery-lines', {
  driver_name,
  driver_phone,
  line_name,
  show_region_data,
  commanders_data
})
//根据省市 获取市
export const getPro = (type,data) => post('api/area',{
	type,
	data
})
// 获取所有的省份
export const province = (type) => post('api/area', {
  type
})

// 获取所有城市
export const city = (type, data) => post('api/area', {
  type: type,
  data: JSON.stringify(data)
})

// 配送路线详情
export const routedetail = (id) => GET('api/delivery-lines/' + id, {

})

// 修改配送路线
export const updateroute = (id, driver_name, driver_phone, line_name, show_region_data, commanders_data) => patch('api/delivery-lines/' + id + '?driver_name=' + driver_name + '&driver_phone=' + driver_phone +
'&line_name=' + line_name + '&show_region_data=' + show_region_data + '&commanders_data=' + commanders_data,
{

})

// 添加时获取线路内取货点
export const pickuppoints = (city_id) => post('api/get-regimental-commander', {
  city_id
})

// 删除配送路线
export const deleteroute = (id) => delate('api/delivery-lines/' + id, {

})

// 删除线路内取货点
export const getgoods = (commander_id, delivery_line_id) => GET('api/delivery-lines/delete-commander', {
  commander_id,
  delivery_line_id
})

// 物流管理  获取产品名称
export const getGoodsName = () => GET('api/goods/back')
