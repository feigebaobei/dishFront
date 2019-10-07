const consumer = [
  {
    path: '/consumer',
    // name: 'consumer',
    component: (resolve) => {
      require(['@/views/consumer/index'], resolve)
    },
    children: [
      {
        path: '',
        component: resolve => {
          require(['@/views/consumer/market'], resolve)
        }
      },
      {
        path: 'market',
        component: resolve => {
          require(['@/views/consumer/market'], resolve)
        }
      },
      {
        path: 'dishDetail',
        component: resolve => {
          require(['@/views/consumer/dishDetail'], resolve)
        }
      },
      {
        path: 'payResult',
        component: resolve => {
          require(['@/views/consumer/payResult'], resolve)
        }
      },
      {
        path: 'orderList',
        component: resolve => {
          require(['@/views/consumer/orderList'], resolve)
        }
      }
    ]
  }
]

export default consumer
