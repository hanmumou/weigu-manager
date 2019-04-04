import { GET, delate, patch, post } from '@/utils/request'

export const banner = (id) => GET('api/slide-shows?page=' + id)
export const delBanner = (id) => delate('api/slide-shows/' + id)
export const editBanner = (id) => patch('api/slide-shows/' + id)
export const addBanner = (data) => post('api/slide-shows', data)
export const goodsList = () => GET('api/goods/back')
