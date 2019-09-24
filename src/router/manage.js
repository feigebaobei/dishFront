const manage = [
  {
    path: '/manage',
    // name: 'manage',
    component: (resolve) => {
      require(['@/views/manage/index'], resolve)
    },
    children: [
      {
        path: '',
        component: resolve => {
          require(['@/views/manage/welcome'], resolve)
        }
      },
      {
        path: 'user',
        component: resolve => {
          require(['@/views/manage/user'], resolve)
        }
      },
      {
        path: 'menu',
        component: resolve => {
          require(['@/views/manage/menu'], resolve)
        }
      }
    ]
  }
]

export default manage
