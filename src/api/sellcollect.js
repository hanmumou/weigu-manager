import { post, GET } from '@/utils/request'

//根据省市 获取市
export const getPro = (type,data) => post('api/area',{
	type,
	data
})

//获取取货点信息  调团长接口
export const getCommander = () =>GET('api/regimental-commander')

//获取销售汇总列表
export const getSaleList = () => GET('api/goods/sales/summary?goods_id=&start_at=&end_at=&province_id=&city_id=&area_id=')
//获取商品列表
export const getGoodsList = () =>GET('api/goods/back')
//根据条件查询商品信息
export const getGoodsByCon = (goods_id, start_at, end_at, province_id, city_id) =>GET('api/goods/sales/summary?goods_id='
+goods_id+'&start_at='+start_at+'&end_at='+end_at+'&province_id='+province_id+'&area_id='
)

//获取取货点汇总列表
export const getAddSale = () =>GET('api/delivery-goods-location/sales/summary')

//根据条件查询取货点汇总列表
export const getPickupList= (commander_id,start_at,end_at,province_id,city_id,goods_id) =>GET('api/delivery-goods-location/sales/summary?commander_id=' +
  commander_id + '&start_at=' + start_at +
  '&province_id=' + province_id +
  '&city_id=' + city_id +
  '&goods_id=' + goods_id
)
