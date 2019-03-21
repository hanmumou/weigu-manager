import { GET,post, delate, patch } from '@/utils/request'

//获取储值卡会员列表
export const getVipList = () => GET('api/members')

//修改会员姓名和手机号
export const editVip = (id, username, phone) =>patch('api/members',{
  id,
  username,
  phone
})

//会员列表  删除


