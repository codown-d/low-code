// 运行时配置

import { requestConfig } from './requestConfig';
import { listFiles } from './services';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}
export const request = {
  ...requestConfig,
};
export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      params: {},
      request: async (params, defaultMenuData) => {
        console.log(123);
        const response = await listFiles();
        console.log(response);
        let {data } =response
        let menuData= data.map(item=>{
          return {
            name: `低代码预览${item.fileName}`,
            key:item.fileName,
            path: `/low-code-engine-preview?fileName=${item.fileName}`,
            component: './Preview',
            headerRender: false,
            meta: { item }
          }
        })
        return [
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
          ...menuData
        ];
      },
    },
  };
};

export const qiankun = {
  apps: [
    {
      name: 'low-code-engine',
      entry:
        process.env.NODE_ENV === 'development'
          ? '//localhost:8001'
          : '/child/low-code-engine/',
      activeRule: '/low-code-engine',
      props: {},
    },
  ],
};
