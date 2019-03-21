import { post, GET } from '@/utils/request'

// 提交商品
export const addGoods = (data) => post('api/goods', data)

export const getFenlei = () => GET('api/goods-class-list')

export const getP = (type, data) => post('api/area', {
  type,
  data
})

export const addStock = (data) => post('api/goods/sku/stock', {
  data
})

export const goodsView = (id) => GET('api/goods/' + id)
//获取商品的笛卡尔积接口
export const getSku = (id) => GET('api/goods/sku/cartesian-product/' + id)


