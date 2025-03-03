import React, { useEffect } from 'react';
import { setRoutes } from 'umi';
import axios from 'axios';

const loadRoutes = async () => {
  try {
    // 获取用户权限信息
    const userPermissions = await axios.get('/api/user/permissions');

    // 根据权限信息加载对应的路由
    const routes = [
      {
        path: '/home',
        component: '@/pages/home',
      },
    ];

    if (userPermissions.includes('view_dashboard')) {
      routes.push({
        path: '/dashboard',
        component: '@/pages/dashboard',
      });
    }

    setRoutes(routes);  // 动态设置路由
  } catch (error) {
    console.error('加载路由失败:', error);
  }
};

const BasicLayout = () => {
  useEffect(() => {
    loadRoutes();
  }, []);

  return <div>Loading...</div>;
};

export default BasicLayout;
