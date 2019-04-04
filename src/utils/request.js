import axios from 'axios'
// import { Message } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth' // 导入token
import qs from 'qs'
// import { promises } from 'fs'
const baseUrl = process.env.BASE_API
// 小程序绑定接口
const baseUrl_app = 'https://wwww.suokekj.com/'
axios.defaults.isRetryRequest = false
// 创建axios实例
// request拦截器
axios.interceptors.request.use(
  config => {
    // 设置默认响应内容格式
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    // 如果token存在
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // 检测post请求响应数据类型
    if (config.method === 'post') {
      // 内容响应格式非json类型
      if (config.headers['Content-Type'].match(/application\/x-www-form-urlencoded/i)) {
        config.data = qs.stringify({
          ...config.data
        })
      }
    }

    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)
// response 拦截器
axios.interceptors.response.use(
  response => {
    axios.defaults.isRetryRequest = false
    return response
  },
  error => {
    // 处理异常信息
    if (error.response) {
      // 刷新token
      if (error.response.data.message === 'Unauthenticated.' && error.response.data.status_code === 500) {
        getRefreshToken()
        error.response.isRetryRequest = true
        return axios(error.config)
      }
      // 重复刷新token
      if (error.response.data.message === 'Unauthenticated.') {
        console.log('第二次刷新')
        // return false
      }
      // 错误信息接口除token以外加入弹窗信息
      //    if (error.response.data.message !== 'Unauthenticated.') {
      //      var messageString = ''
      //      for (const i in error.response.data.errors) {
      //        messageString += error.response.data.errors[i]
      //      }
      //      Message({
      //        type: 'info',
      //        message: `${messageString}`
      //      })
      //      messageString = ''
      //    }
    }
    return Promise.reject(error)
  })

// 请求刷新token 方法
function getRefreshToken() {
  axios.put(baseUrl + 'api/admin/authorizations/current').then(res => {
    console.log(res.data.access_token)
    setToken(res.data.access_token)
    console.log(getToken())
  })
}

export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, data, config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const GET = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.get(baseUrl + url, ConfigData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Patch Request
 *
 * 说明：data传参，数据类型为json时，默认转换为jsonString
 *
 * @param url
 * @param data 标准数据
 * @param config 额外参数
 * @returns {Promise<any>}
 */
export const patch = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch(`${baseUrl}${url}`, { data }, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const delate = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.delete(`${baseUrl}${url}`, ConfigData).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 小程序绑定接口走这个
export const PostApp = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl_app + url, data, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const GetApp = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.get(baseUrl_app + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const put = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data, config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
