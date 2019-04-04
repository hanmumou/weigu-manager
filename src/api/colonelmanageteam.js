import { GET } from '@/utils/request'

//获取团长团队列表
export const getList = () => GET('api/team')
