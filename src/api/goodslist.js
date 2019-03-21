import { GET, post, patch } from '@/utils/request'

export const getGoodsList = (id, data) => GET('api/goods/back?page=' + id, data)
export const getSpecList = (id) => GET('api/goods/sku/cartesian-product/' + id)
export const changeTj = (id) => GET('api/goods/recommand-index/' + id)
export const editGoods = (id, category_id, show_region_type, show_region, name, introduce, main_picture, detail_picture,
  video_url, cost_price, original_price, price, goods_sku_status, goods_sku, start_at,
  end_at, delivery_at, goods_limit_stock, commission, goods_type, details, sort, is_sales_record) => patch('api/goods/' + id +
  '?category_id=' + category_id +
  '&show_region_type=' + show_region_type +
  '&show_region=' + show_region +
  '&name=' + name +
  '&introduce=' + introduce +
  '&main_picture=' + main_picture +
  '&detail_picture=' + detail_picture +
  '&video_url=' + video_url +
  '&cost_price=' + cost_price +
  '&original_price=' + original_price +
  '&price=' + price +
  '&goods_sku_status=' + goods_sku_status +
  '&goods_sku=' + goods_sku +
  '&start_at=' + start_at +
  '&end_at=' + end_at +
  '&delivery_at=' + delivery_at +
  '&goods_limit_stock=' + goods_limit_stock +
  '&commission=' + commission +
  '&goods_type=' + goods_type +
  '&details=' + details +
  '&sort=' + sort +
  '&is_sales_record=' + is_sales_record, {})
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
