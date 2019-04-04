import { post, delate, patch } from '@/utils/request'

// 自定义广告删除
export const delAdverList = (id) => delate('api/advertisements/' + id)

// 自定义广告添加
export const addAdverlist = (img_url, title, status, details) => post('api/advertisements', {
  img_url,
  title,
  status,
  details
})

//自定义广告修改
export const editAder = (id, img_url, title, status, details) => patch('api/advertisements/'+id,{
  img_url,
  title,
  status,
  details
})
