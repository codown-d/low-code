// 示例：请求接口获取路由数据
import { useEffect, useState } from 'react';
import { request } from '@umijs/max'; // 使用 Umi 的请求库

const useDynamicRoutes = () => {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // 假设接口返回一个包含路由配置的数组
        const response = await request('/api/list-files');
        setRoutes(response.routes); // 存储返回的路由配置
      } catch (error) {
        console.error('获取路由失败', error);
      }
    };
    fetchRoutes();
  }, []);
  return {routes}
};

export default useDynamicRoutes;
