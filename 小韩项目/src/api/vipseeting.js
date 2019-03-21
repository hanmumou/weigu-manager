import { post, GET, patch, delate } from '@/utils/request'

// 获取储值卡列表
export const GetValCardList = (page) => GET('api/value-card?page=' + page)

// 更改储值卡禁用或启用状态
export const chanagecardlist = (id, status) => patch('api/value-card/' + id + '?status=' + status)

// 删除储值卡
export const DelCardlist = (id) => delate('api/value-card/' + id)

// 增加储值卡列表
export const addCardlist = (denomination, payment_amount) => post('api/value-card', {
  denomination,
  payment_amount
})
