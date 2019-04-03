import { GET } from '@/utils/request'

//获取团长团队列表
export const getList = () => GET('api/admin/teams/list')

//根据条件查询团队列表
export const getListByCon = (province_id, city_id, name, phone) =>GET('api/admin/teams/list?province_id='
 + province_id + '&city_id=' + city_id + '&name=' + name +'&phone=' + phone
)
