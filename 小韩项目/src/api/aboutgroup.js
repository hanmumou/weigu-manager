import { patch, GET, post } from '@/utils/request'
// 获取公司列表
export const aboutgroup = (id, name, logo, phone, address, introduce) => patch('api/companies/' + id + '?name=' + name + '&logo=' + logo + '&phone=' + phone + '&address=' + address + '&introduce=' + introduce)
// 修改公司
export const aboutCompents = (id) => GET('api/companies/' + id, {
})
// 创建公司
export const creataCompanise = (name, logo, phone, address, introduce) => post('api/companies', {
  name, logo, phone, address, introduce
})
