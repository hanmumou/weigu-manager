import { getsupplierList } from '@/api/suppliermanage'

const supplier = {
  state: {
    res: []
  },
  mutations: {
    SET_RES: (state, res) => {
      state.res = res
    }
  },
  actions: {
    async getsupplierlist({ commit }) {
      try {
        const res = await getsupplierList()
        commit('SET_RES', res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default supplier
