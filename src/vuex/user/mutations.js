const mutations = {
  updateToken: (state, payload) => {
    // console.log(payload)
    state.token = payload.token
    // console.log(state.token)
    localStorage.token = payload.token
  },
  updateUser: (state, payload) => {
    // state.user = payload.user
    state.username = payload.username
  }
}

export default mutations
