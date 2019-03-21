import { GET, post } from '@/utils/request'

export const getList = (goods_name, show_region_data, commander_name) => GET('api/goods/show-region', {
  goods_name,
  show_region_data,
  commander_name
})

export const goodsList = () => GET('api/goods/back')

export const saveList = (goods_data, show_region_data, commander_data) => post('api/goods/show-region', {
  goods_data,
  show_region_data,
  commander_data
})

export const getProvince = (type, data) => post('api/area', {
  type,
  data
})

export const getTeem = (city_id) => post('api/get-regimental-commander', {
  city_id
})

export const delList = (goods_data, show_region_data, commander_data) => post('api/goods/show-region/remove', {
  goods_data,
  show_region_data,
  commander_data
})
