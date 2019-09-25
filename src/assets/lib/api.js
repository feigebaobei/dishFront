import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:3443/',
  timeout: 5000,
  headers: {
    // 'Access-Control-Allow-Origin': ''
  },
  // withCredentials: 'include'
  withCredentials: true
})

// instance.defaults.transformRequest = [(data) => {...}]

instance.interceptors.request.use(config => { // config是axios的配置项
  return config
}, error => {
  return Promise.reject(error)
})
instance.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  return Promise.reject(error)
})

const obj = {
  isLogin: params => {
    return instance.post('users/isLogin', params)
  },
  login: params => {
    return instance.post('users/login', params)
  },
  root: params => {
    return instance.post('users', params)
  },
  testCookie: params => {
    return instance.get('users', params)
  }
}

export default obj
