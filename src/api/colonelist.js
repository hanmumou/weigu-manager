import { GET, patch, delate, post } from '@/utils/request'

// 获取团长列表
export const getColonelist = () => GET('api/regimental-commander')

// 根据查询条件获取团长列表
export const setColonelist = (atea_id, name, phone, created_at, status) => GET('api/team?' +
'atea_id=' + atea_id +
'&name=' + name +
'&phone=' + phone +
'&created_at=' + created_at +
'&status=' + status)

// 禁用启用
export const setStatus = (id, status) => patch('api/regimental-commander/edit-status/' + id + '?status=' + status)

// 删除团长
export const delcolone = (id) => delate('api/regimental-commander/' + id)

// 团长编辑
export const chanagecolone = (id, name, phone, residential_quarters, address) => patch(
  'api/regimental-commander/' + id +
'?name=' + name +
'&phone=' + phone +
'&residential_quarters=' + residential_quarters +
'&address=' + address
)

//根据省市 获取市
export const getPro = (type,data) => post('api/area',{
	type,
	data
})

//团长资金管理  获取提现管理列表
export const getCashlist = () =>GET('/api/regimental-commander/transfer-money-orders')

//根据条件查询 提现管理列表
export const getCashBycon = (apply_status, province_id, city_id, nickname, phone, address, start_at, end_at) =>GET('/api/regimental-commander/transfer-money-orders?apply_status='
 + apply_status +'&province_id=' + province_id +'&city_id=' + city_id + '&nickname=' + nickname + '&phone=' + phone +'&address=' + address
  +'&start_at=' + start_at + '&end_at=' + end_at
)

//获取佣金明细列表
export const getMoneyList = () =>GET('api/regimental-commander/commission/list')

//根据条件查询返回的佣金明细列表
export const searchMoney = (name, phone,community_name,goods_id,start_at,end_at,commission_status) =>GET('api/regimental-commander/commission/list?name=' +
 name + '&phone=' + phone
   + '&community_name=' + community_name
  + '&goods_id=' + goods_id
  + '&start_at=' + start_at
  + '&end_at=' + end_at
  + '&commission_status=' + commission_status

)

//导出佣金明细
export const exportMoney = (commander_commission_record_ids,name,phone,community_name,goods_id,start_at,end_at,commission_status) =>GET('api/regimental-commander/commission/list/export?commander_commission_record_ids='
 + '&name=' + name +
  '&phone=' + phone +
  '&community_name=' + community_name +
  '&goods_id=' + goods_id +
  '&start_at=' + start_at +
  '&end_at=' + end_at +
  '&commission_status=' + commission_status
)
