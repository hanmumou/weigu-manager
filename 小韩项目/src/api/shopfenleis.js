import { GET } from '@/utils/request'
import { post, patch } from '@/utils/request'
// 商品分类管理

// 商品分类列表
export const shop = (page) => GET('api/goods-class-list?page=' + page)

// 新增商品分类
export const addshop = (name, sort) => post('api/goods-class-store', {
  name,
  sort
})

// 删除商品分类
export const deleteshop = (id) => GET('api/goods-class-destroy?id=' + id, {

})

// 修改商品分类
export const editshop = (id, name, sort) => patch('api/goods-class-update/' + id + '?name=' + name + '&sort=' + sort, {

})

// 显示单个商品详情
export const onelist = (id) => GET('api/goods-class-details?id=' + id)
