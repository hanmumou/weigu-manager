import axios from 'axios'
// import { Message } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth' // 导入token
import qs from 'qs'
// import { promises } from 'fs'
const baseUrl = process.env.BASE_API
const baseUrl2 = 'http://newapi.qzlckj.com/'
const baseLogin = 'http://sso.qzlckj.com/'
axios.defaults.isRetryRequest = false
// 创建axios实例
// request拦截器
axios.interceptors.request.use(
  config => {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    // 如果token存在
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    if (config.method === 'post') {
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
  })

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
    const ConfigData = config
    ConfigData.params = data
    axios.post(baseUrl + url, {}, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const GET = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data
    axios.get(baseUrl + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const getlist = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data
    axios.get(baseUrl2 + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const patch = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data
    axios.patch(`${baseUrl}${url}`, {}, config).then(res => {
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

//登录接口api
export const loginpost = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(baseLogin + url, data, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loginget = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.get(baseLogin + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//添加类目
export const addsave = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.post('http://newapi.qzlckj.com/' + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改类目
export const updateclass = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.post('http://newapi.qzlckj.com/' + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//删除
export const deleteclass = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const ConfigData = config
    ConfigData.params = data

    axios.delete('http://newapi.qzlckj.com/' + url, ConfigData).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

