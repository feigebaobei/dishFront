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
        },
        children: [
          // {
          //   path: ''
          // }
        ]
      },
      {
        path: 'menu',
        component: resolve => {
          require(['@/views/manage/menu/index'], resolve)
        },
        children: [
          {
            path: '',
            component: resolve => {
              require(['@/views/manage/menu/query'], resolve)
            }
          },
          {
            path: 'query',
            component: resolve => {
              require(['@/views/manage/menu/query'], resolve)
            }
          },
          {
            path: 'edit',
            component: resolve => {
              require(['@/views/manage/menu/edit'], resolve)
            }
          }
        ]
      }
    ]
  }
]

export default manage
