const consumer = [
  {
    path: '/consumer',
    // name: 'consumer',
    component: (resolve) => {
      require(['@/views/consumer/index'], resolve)
    },
    children: [
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
