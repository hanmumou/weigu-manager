import { GET, delate, patch, post } from '@/utils/request'

export const banner = (id) => GET('api/slide-shows?page=' + id)
export const delBanner = (id) => delate('api/slide-shows/' + id)
export const editBanner = (id) => patch('api/slide-shows/' + id)
export const addBanner = (data) => post('api/slide-shows', data)
//获取添加轮播图的下拉框信息   产品名称
export const goodsList = () => GET('api/goods/back')

//获得自定义广告信息
export const getAderInfo = () =>GET ('api/advertisements')

