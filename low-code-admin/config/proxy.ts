const proxy = {
    '/api': {
      target: 'http://150.158.93.25:7001/',
      changeOrigin: true,
    //   pathRewrite: { '^/api': '' },
  },
};

export default proxy;