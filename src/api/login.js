import { post, GET, delate, loginpost,loginget } from '@/utils/request'

// 登录
export const Login = (username, password) => loginpost('weigu-sso/user/login', {
  username,
  password
})

// export const getInfo = (token) => GET('/user/info', {
//   token
// })

// 拉取用户信息
export const getInfo = (token) => loginget('weigu-sso/user/token/' + token)



