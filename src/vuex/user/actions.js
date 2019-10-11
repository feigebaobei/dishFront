const actions = {
  updateToken: ({commit}, payload) => {
    commit('updateToken', payload)
  },
  updateUser: ({commit}, payload) => {
    commit('updateUser', payload)
  }
}
export default actions
