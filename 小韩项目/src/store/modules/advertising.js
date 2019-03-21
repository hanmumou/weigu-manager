import Vue from 'vue'
import vuex from 'vuex'
import { advertising } from '@/api/advertising'
Vue.use(vuex)

const advertisinglist = {
  state: {
    advertising: [],
    id: ''
  },
  mutations: {
    SET_ADV(state, res) {
      state.advertising = res
    },
    increment: (state, n) => {
      state.id = n
    }
  },
  actions: {
    async advlist({ commit }) {
      try {
        const res = await advertising()
        commit('SET_ADV', res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
export default advertisinglist

