import { post } from '@/utils/request'
export const getProvice = (type) => post('api/area', { type })

export const getCity = (type, data) => post('api/area', { type, data })
