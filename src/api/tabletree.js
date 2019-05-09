import { post, getlist, patch, addsave, updateclass,deleteclass} from '@/utils/request'

//获取数据
export const getTableData = () =>getlist('api/type/findTop/')

//加载子节点
export const getTreeNode = (id) =>getlist('api/type/findTypeBySid/' + id)

//添加类目  保存
export const summitInfo = (pid, name , description , fixed , top , minval , maxval , url , sort_order,icon) =>addsave('api/type/save',{
  pid,
  name,
  description,
  fixed,
  top,
  minval,
  maxval,
  url,
  sort_order,
  icon
})
//根据id 查询信息
export const getInfoByid = (id) =>getlist('api/type/findByTypeId/'+id)
//修改类目
export const editClass= (id, pid, name , description , fixed , top , minval , maxval , url , sort_order,icon) =>updateclass('api/type/update',{
  id,
  pid,
  name,
  description,
  fixed,
  top,
  minval,
  maxval,
  url,
  sort_order,
  icon
})

//删除节点信息
export const deleteInfo = (id) =>deleteclass('api/type/delete?id=' + id)


