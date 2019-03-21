import { GET } from '@/utils/request'

// 获取用户列表
export const getuserlist = () => GET('api/community-users')

// 根据条件查询来获取用户列表
export const getlistofconditions = (id, name, phone) => GET('api/community-users?' +
'id=' + (typeof (id) === undefined || id == null ? '' : id) +
'&name=' + (typeof (name) === undefined || name == null ? '' : name) +
'&phone=' + (typeof (phone) === undefined || phone == null ? '' : phone)
)
