import { GET } from '@/utils/request'

// 商品分类列表
export const shop = () => GET('api/goods-class-list')
