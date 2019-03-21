import Vue from 'vue'
import vuex from 'vuex'
import { addshop } from '@/api/shopfenleis'

Vue.use(vuex)

const addshoplist = {
  state: {
    addres: []
  },
  mutations: {
    changeTestMsg(state, str) {
      console.log(state)
      console.log(str)
    }
  },
  actions: {
    async addshoplist({ commit }, str) {
      try {
        const res = await addshop(str.value, str.sort)
        console.log('后台数据', res)
        commit('changeTestMsg', res)
        // for (const i in res) {
        //   console.log('回复')
        //   if (res.data[i].name === str.value) {
        //     console.log('输入的内容已存在')
        //   }
        // }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
export default addshoplist
