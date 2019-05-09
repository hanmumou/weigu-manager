import { post, GET, patch, delate} from '@/utils/request'

//获取列表
export const getDictionList = (page) =>GET('api/tech/page?page=' + page)

//新增字典 保存
export const submitAdd = (data) =>post('api/tech/add',{
  data
})

//根据id 获得字典详情
export const getDetailById = (id) =>GET('api/tech/'+id)
//修改字典详情
export const editDtail = (data) =>post('api/tech/update',{
  data
})

//删除
export const deleteData = (ids) =>post('api/tech/delete',{
  ids
})
