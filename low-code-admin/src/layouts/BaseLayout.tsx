import useDynamicRoutes from '@/hooks';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';

const BaseLayout  = ({ children }) => {
  return <>{children}</>;
};

export default BaseLayout ;
