const getters = {
  getToken: state => {
    // return state.token
    if (state.token) {
      return state.token
    } else {
      return localStorage.token
    }
  },
  getUserName: state => state.username
}

export default getters
