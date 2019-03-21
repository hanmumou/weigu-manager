import { getProvice, getCity } from '@/api/cityapi'

var provice = []
var city = []
// 获取省的方法
export const getprovice = () => {
  const type = 1
  const res = getProvice(type)
  console.log('res', res)
  provice = res.data
  return provice
}
// 获取城市的方法
export const getcity = (provice) => {
  const type = 2
  const data = JSON.stringify({ 'province_id': provice })
  const res = getCity(type, data)
  city = res.data
  return city
}
// 传入省id 返回省的名字
export const getproviceid = (provinceid) => {
  for (const i in provice) {
    if (provinceid === provice[i].province_id) {
      return provice[i].name
    }
  }
}
// 传入城市id 返回城市的名字
export const getcityid = (cityid) => {
  for (const i in city) {
    if (cityid === city[i].city_id) {
      return city[i].name
    }
  }
}
