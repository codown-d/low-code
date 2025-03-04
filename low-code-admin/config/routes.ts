const routes = [

  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  }, 
  {
    name: ' 低代码平台',
    path: '/low-code-engine/*',
    microApp: 'low-code-engine',
    target: '_blank',
    headerRender: false,
    menuRender: false,
    // layoutRender: false,
    // hideInMenu: true,
  },
  {
    name: ' 低代码预览',
    path: '/low-code-engine-preview',
    component: './Preview',
    headerRender: false,
    menuRender: false,
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/home',
  }, {
    path: '',
    redirect: '/',
  },
];
export default routes;
