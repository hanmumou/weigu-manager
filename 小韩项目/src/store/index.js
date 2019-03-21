import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import colonelist from './modules/colonelist'
import shopfenlei from './modules/shopfenlei'
import addshop from './modules/addshop'
import deleteshop from './modules/deleteshop'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    colonelist,
    shopfenlei,
    addshop,
    deleteshop
  },
  getters
})

export default store
