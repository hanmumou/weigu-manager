import { Login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menus:''
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
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    async Login({ commit }, userInfo) {//登录获得token
      const username = userInfo.username.trim()
        try {
        await Login(username, userInfo.password).then(res=>{
          if(res.data.success){
            setToken(res.data.message)
            commit('SET_TOKEN',res.data.message)//res.data.access_token
            //console.log(user.state.token)  //token设置成功
            return Promise.resolve()
          }else if(!res.data.success){
            this.$message.warning('用户名和密码不正确,请重新输入')
          }

        })
      } catch (err) {
        return Promise.reject(err)
      }
    },

    // 获取用户信息
    async GetInfo({ commit, state }) {
      try {
        const res = await getInfo(state.token)
        console.log(res)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('name', res.data.name)
        if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
        } else {
          return Promise.reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', res.data.name)
        //commit('SET_AVATAR', res.data.avatar)
        return Promise.resolve(res)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

export default user
