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
          {
            path: 'query',
            component: resolve => {
              require(['@/views/manage/user/query'], resolve)
            }
          },
          {
            path: 'edit',
            component: resolve => {
              require(['@/views/manage/user/edit'], resolve)
            }
          },
          {
            path: 'add',
            component: resolve => {
              require(['@/views/manage/user/add'], resolve)
            }
          }
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
            path: 'add',
            component: resolve => {
              require(['@/views/manage/menu/add'], resolve)
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
  // {
  //   path: '/user',
  //   component: (resolve) => {
  //     require(['@/views/user/index'], resolve)
  //   },
  //   children: []
  // }
]

export default manage
