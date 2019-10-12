const mutations = {
  updateToken: (state, payload) => {
    state.token = payload.token
    localStorage.token = payload.token
  },
  updateUser: (state, payload) => {
    state.username = payload.username
    localStorage.username = payload.username
  }
}

export default mutations
