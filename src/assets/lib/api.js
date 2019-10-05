import axios from 'axios'
import qs from 'qs'

let option = {
  baseURL: 'https://localhost:3443/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  withCredentials: true
}
// instance.defaults.transformRequest = [(data) => {...}]

// instance.interceptors.response.use(response => {
//   return response
// }, error => {
//   console.log(error)
//   // return Promise.reject(error)
//   if (error.response) {
//     if (error.response.status === 401) {
//       return Promise.reject({error: '', message: 'no login'})
//     } else {
//       if (error.response.status === 403) {
//         return Promise.reject({error: '', message: 'no login'})
//       } else {
//         return Promise.reject(error)
//       }
//     }
//   }
//   return Promise.reject(error.response.data)
// })

let instance = (opt) => {
  let inst = axios.create(Object.assign(option, opt))
  inst.interceptors.request.use(config => { // config是axios的配置项
    return config
  }, error => {
    return Promise.reject(error)
  })
  return inst
}

const obj = {
  isLogin: (opt) => {
    return instance(opt).post('users/isLogin')
  },
  login: (params, opt = {}) => {
    return instance(opt).post('users/login', params)
  },
  addDish: (params, opt = {}) => {
    // return instance.post('dish', params)
    return instance(opt).post('dish', params)
  },
  queryDish: (params, opt = {}) => {
    // console.log(params, opt)
    let qsString = qs.stringify(params)
    return instance(opt).get('dish' + '?' + qsString)
    // return instance(opt).get('dish', params)
  },
  // 编辑指定菜品
  editDish: (dishId, params) => {
    return instance.put(`dish/${dishId}`, params)
  },
  // 请求指定菜品的详细数据
  detailDish: (dishId) => {
    return instance.get(`dish/${dishId}`)
  },
  // 删除指定的数据
  deleteDish: (dishId) => {
    return instance.delete(`dish/${dishId}`)
  },
  // test
  root: params => {
    return instance.post('users', params)
  },
  testCookie: params => {
    return instance.get('users', params)
  },
  dishTest: params => {
    return instance.post('dish/test', params)
  }
}

export default obj
