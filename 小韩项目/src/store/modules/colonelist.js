import { getColonelist, setColonelist, setStatus, delcolone } from '@/api/colonelist'

const colonelist = {
  state: {
    res: [],
    list: [],
    conloneStatus: []
  },
  mutations: {
    SET_RES: (state, res) => {
      state.res = res
    },
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_status: (state, colonestatus) => {
      state.conloneStatus = colonestatus
    }
  },
  actions: {
    // 获取团长列表
    async getlist({ commit }) {
      try {
        const res = await getColonelist()
        commit('SET_RES', res)
      } catch (err) {
        console.log(err)
      }
    },
    // 根据条件获取团长列表
    async setcolonelist({ commit }, colonelist) {
      try {
        const list = await setColonelist(colonelist.atea_id, colonelist.name, colonelist.phone, colonelist.created_at, colonelist.status)
        commit('SET_LIST', list)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击改变禁用启用
    async setconloneStatus({ commit }, setstatus) {
      try {
        const colonestatus = await setStatus(setstatus.id, setstatus.status)
        commit('SET_status', colonestatus)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击按钮以删除团长
    async hadledelcolone({ commit }, id) {
      try {
        await delcolone(id)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
export default colonelist
