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
      }
    ]
  }
]

export default consumer
