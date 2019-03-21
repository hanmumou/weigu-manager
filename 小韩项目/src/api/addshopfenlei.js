import { post } from '@/utils/request'

export const addshop = (name, sort) => post('api/goods-class-store', {
  name,
  sort
})

