import { GET, patch, delate, post } from '@/utils/request'

// 获取团长列表
export const getColonelist = (page) => GET('api/team?page=' + page)

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
