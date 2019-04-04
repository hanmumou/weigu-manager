import { Login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data
    //       setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    async Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      try {
        const res = await Login(username, userInfo.password, userInfo.qrcode, userInfo.qrcode_key)
        setToken(res.data.access_token)
        //localStorage.setItem(TokenKey, res.data.access_token)
        //console.log(res.data.access_token)
        commit('SET_TOKEN', res.data.access_token)
        //console.log(user.state.token)  //token设置成功
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },

    // 获取用户信息
    async GetInfo({ commit, state }) {
      try {
        const res = await getInfo(state.token)
        localStorage.setItem('id', res.id)
        localStorage.setItem('name', res.name)
        if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
        } else {
          return Promise.reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', res.name)
        commit('SET_AVATAR', res.avatar)
        return Promise.resolve(res)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
