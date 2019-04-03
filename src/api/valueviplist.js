import { GET,post, delate, patch } from '@/utils/request'

//获取储值卡会员列表
export const getVipList = () => GET('api/members')

//修改会员姓名和手机号
export const editVip = (id, username, phone) =>post('api/members',{
  id,
  username,
  phone
})

//会员列表  修改会员状态   启用 禁用
export const changeStatus = (id) =>patch('api/members/change-status/' + id)

//删除会员
export const deleteVip = (id) =>delate('api/members/' + id)

//根据条件查询会员
export const searchVip = (id, username, phone, created_at, status) => GET('api/members?id=' + id
+ '&username=' + username + '&phone=' + phone + '&created_at=' + created_at +'&status=' + status
)

//获取会员消费详情
export const getCostDetail = () =>GET('api/member/orders')

//根据条件查询会员消费详情
export const getDetailByCon = (id, username, phone, created_at, end_at) =>GET('api/member/orders?id=' + id
+'&username=' + username +'&phone=' + phone + '&created_at=' + created_at +'&ended_at=' + end_at
)



