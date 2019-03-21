import { post, delate } from '@/utils/request'

// 自定义广告删除
export const delAdverList = (id) => delate('api/advertisements/' + id)

// 自定义广告添加
export const addAdverlist = (img_url, title, status, details) => post('api/advertisements', {
  img_url,
  title,
  status,
  details
})
