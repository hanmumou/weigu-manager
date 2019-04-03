import { GET, post, patch } from '@/utils/request'

export const getGoodsList = (id, data) => GET('api/goods/back?page=' + id, data)
export const getSpecList = (id) => GET('api/goods/sku/cartesian-product/' + id)
export const changeTj = (id) => GET('api/goods/recommand-index/' + id)
export const editGoods = (
  id, category_id, name, introduce, main_picture, detail_picture, video_url, price, original_price, cost_price, goods_sku_status,
  start_at, end_at, delivery_at, goods_limit_stock, stock, commission, commander_leader_commission, goods_type, details,
  address_ids, regimental_ids
) => post('api/goods/' + id, {
  category_id, name, introduce, main_picture, detail_picture, video_url, price, original_price, cost_price, goods_sku_status,
  start_at, end_at, delivery_at, goods_limit_stock, stock, commission, commander_leader_commission, goods_type, details,
  address_ids, regimental_ids
})
export const changeGoods = (data, goods_status) => post('api/goods/sold-out', {
  data,
  goods_status
})
export const getClassList = () => GET('api/goods-class-list')
export const getArea = (type) => post('api/area', {
  type
})
export const getCity = (type, data) => post('api/area', {
  type,
  data
})
export const delGoods = (goods_id_json) => post('api/goods/goods-delete', {
  goods_id_json
})

// 根据商品id获取该商品规格笛卡尔积   调的是商品属性笛卡尔积接口
export const getSkuById = (id) => GET('api/goods/sku/cartesian-product/' + id)
// 商品有规格时   修改商品团购价及库存 且提交该商品规格的笛卡尔积接口
export const editPriceStock = (data) => post('api/goods/sku/stock', { data })

// 商品列表中  更新商品虚拟销量
export const updateVirtualNum = (id, num) => GET('/api/goods/virtual-sales-num/' + id + '?virtual_sales_num=' + num)
