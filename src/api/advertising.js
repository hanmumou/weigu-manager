import { GET } from '@/utils/request'

export const advertising = (id) => GET('api/advertisements?page=' + id)
