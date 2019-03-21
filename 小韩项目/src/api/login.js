import { post, GET, delate } from '@/utils/request'

// 登录
export const Login = (name, password, captcha_code, captcha_key) => post('api/admin/authorizations/login', {
  name,
  password,
  captcha_code,
  captcha_key
})

// export const getInfo = (token) => GET('/user/info', {
//   token
// })
/** 获取图像验证码 **/
export const captchas = () => post('api/admin/authorizations/captchas')

// 拉取用户信息
export const getInfo = () => GET('api/admin/authorizations/info', {
})

export const Logout = (token) => delate('/api/admin/authorizations/current?' + 'token=' + token)

