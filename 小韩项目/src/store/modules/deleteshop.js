import Vue from 'vue'
import vuex from 'vuex'
import { deleteshop } from '@/api/shopfenleis'

Vue.use(vuex)

const deletelist = {
  state: {
    del: []
  },
  mutations: {
    dellist(state, str) {
      console.log(state)
      console.log(str)
    }
  },
  actions: {
    async deletell({ commit }, str) {
      try {
        console.log(str)
        const res = await deleteshop(str)
        console.log(res)
        // commit('dellist', res)
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }

}
export default deletelist
