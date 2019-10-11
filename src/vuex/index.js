import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
import stateUser from './user/state'
// import getters from './getters'
import gettersUser from './user/getters'
// import mutations from './mutations'
import mutationsUser from './user/mutations'
// import actions from './actions'
import actionsUser from './user/actions'
import stateOrder from './order/state'
import gettersOrder from './order/getters'
import mutationsOrder from './order/mutations'
import actionsOrder from './order/actions'

Vue.use(Vuex)

// 因state可以使用模块名区分开.getters/mutations/actions不会受模块名分开.所以做这三块功能时就在方法上做区分.一般使用前缀/后缀区分.
const user = {
  state: stateUser,
  getters: gettersUser,
  mutations: mutationsUser,
  actions: actionsUser
}

const order = {
  state: stateOrder,
  getters: gettersOrder,
  mutations: mutationsOrder,
  actions: actionsOrder
}

// const store = new Vuex.Store({
//   state,
//   getters,
//   mutations,
//   actions
// })

const store = new Vuex.Store({
  modules: {
    user: user,
    order: order
  }
})

export default store
