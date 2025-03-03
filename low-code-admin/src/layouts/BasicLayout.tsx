import useDynamicRoutes from '@/hooks';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';

const BasicLayout = ({ children }) => {
//   const { setRoutes } = useModel('@@initialState'); // 获取 setRoutes 方法来更新路由
//   let { routes } = useDynamicRoutes();
//   useEffect(() => {
//     console.log(routes);
//     // setRoutes((prevRoutes) => [
//     //   ...prevRoutes,
//     //   ...routes, // 将获取到的路由添加到已有的路由中
//     // ]);
//   }, [routes]);

  return <div>{children}</div>;
};

export default BasicLayout;
