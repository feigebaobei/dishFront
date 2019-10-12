import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import store from '@/vuex/index.js'

let option = {
  baseURL: 'https://localhost:3443/',
  timeout: 5000,
  headers: {
    // Authorization: `bearer ${store.state.user.token}`
    // Authorization: `bearer ${store.getters.getToken()}`
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
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
  let inst = axios.create(Object.assign({}, option, opt))
  inst.interceptors.request.use(config => { // config是axios的配置项
    config.headers.Authorization = `bearer ${store.getters.getToken}`
    // 因生命周期的原因需要在请求前添加Authorization
    // console.log(config)
    return config
  }, error => {
    return Promise.reject(error)
  })
  inst.interceptors.response.use(response => {
    if (!response.data.result) {
      throw new Error('服务器返回的数据格式不正确或服务器出错')
    }
    return response
  }, error => {
    let err = null
    switch (error.response.status) {
      case 401:
        err = {error: '', message: 'no login'}
        router.push({
          path: '/login'
        })
        break
      case 403:
        // err = {error: '', message: 'no login'}
        err = error
        break
      default:
        err = error
        break
    }
    return Promise.reject(err)
  })
  return inst
}

const obj = {
  isLogin: (opt = {}) => {
    return instance(opt).post('users/isLogin')
  },
  login: (params, opt = {}) => {
    return instance(opt).post('users/login', params)
  },
  // 添加菜品
  addDish: (params, opt = {}) => {
    // return instance.post('dish', params)
    return instance(opt).post('dish', params)
  },
  // 按条件查询菜品
  queryDish: (params, opt = {}) => {
    // console.log(params, opt)
    let qsString = qs.stringify(params)
    return instance(opt).get('dish' + '?' + qsString)
    // return instance(opt).get('dish', params)
  },
  // 编辑指定菜品
  editDish: (dishId, params, opt = {}) => {
    return instance(opt).put(`dish/${dishId}`, params)
  },
  // 请求指定菜品的详细数据
  detailDish: (dishId, opt = {}) => {
    // return instance.get(`dish/${dishId}`)
    return instance(opt).get(`dish/${dishId}`)
  },
  // 删除指定的数据
  deleteDish: (dishId, opt = {}) => {
    return instance(opt).delete(`dish/${dishId}`)
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
  },
  // 订单部分
  payOrder: (params, opt = {}) => {
    // console.log
    return instance(opt).post('order', params)
  },
  getHistoryOrder: (params, opt = {}) => {
    return instance(opt).get(`order?${qs.stringify(params)}`)
  },
  // 评论部分
  getCommentByDishId: (dishId, params, opt = {}) => {
    return instance(opt).get(`dish/${dishId}/comment?${qs.stringify(params)}`)
  },
  // // 查询当前用户的评论
  // getCommentSelf: (dishId, params, opt = {}) => {
  //   return instance(opt).get(`dish/${dishId}/commentCurrentUser?${qs.stringify(params)}`)
  // },
  // // 查询非当前用户的评论
  // getCommentOther: (dishId, params, opt = {}) => {
  //   return instance(opt).get(`dish/${dishId}/commentOtherUser?${qs.stringify(params)}`)
  // },
  addComment: (dishId, params, opt = {}) => {
    return instance(opt).post(`dish/${dishId}/comment`, params)
  },
  editComment: (dishId, commentId, params, opt = {}) => {
    return instance(opt).put(`dish/${dishId}/comment/${commentId}`, params)
  },
  deleteComment: (dishId, commentId, opt = {}) => {
    return instance(opt).delete(`dish/${dishId}/comment/${commentId}`)
  },
  // 用户部分
  queryUserAll: (params, opt = {}) => {
    return instance(opt).get(`users?${qs.stringify(params)}`)
  },
  queryUser: (userId = '', opt = {}) => {
    return instance(opt).get(`users/${userId}`)
  },
  editUser: (userId = '', params, opt = {}) => {
    return instance(opt).put(`users/${userId}`, params)
  },
  deleteUser: (userId, opt = {}) => {
    return instance(opt).delete(`users/${userId}`)
  }
}

export default obj
