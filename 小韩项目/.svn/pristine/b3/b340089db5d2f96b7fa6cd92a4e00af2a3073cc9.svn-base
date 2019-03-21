import Vue from 'vue'
import vuex from 'vuex'
import { shop } from '@/api/shopfenleis'

Vue.use(vuex)

const shoplist = {
  state: {
    resfenlei: []
  },
  mutations: {
    increment: (state, res) => {
      state.resfenlei = res
    }
  },
  actions: {
    async shoplist({ commit }) {
      try {
        const res = await shop()
        console.log(res)
        commit('increment', res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
export default shoplist
