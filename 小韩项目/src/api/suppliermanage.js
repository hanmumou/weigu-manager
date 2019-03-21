import { GET, delate } from '@/utils/request'

// 获取供应商列表
export const getsupplierList = (page) => GET('api/suppliers?page=' + page)

// 删除供应商
export const delsupplierList = (id) => delate('api/suppliers/' + id)

