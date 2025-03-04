import { get, isArray, keys, set } from 'lodash';
// import * as NProgress from 'nprogress';
import { history, proxy } from '@umijs/max';
import queryString from 'query-string';
// import { AxiosCanceler } from './axiosCancel';
// import { showError } from './utils';
// import { storage } from './utils/storage';

type requestStoreProps = { url?: string; timestamp: number };
const requestStoreAction = (url: string, interval = 1000) => {
  const curTime = +new Date();
  if (curTime - requestStore.timestamp > interval) {
    requestStore.url = url;
    requestStore.timestamp = curTime;
  }
};

export const requestStore = proxy<requestStoreProps>({
  url: undefined,
  timestamp: 0,
});

// const axiosCanceler = new AxiosCanceler();

const requestInterceptors = (request: {
  isSignal?: boolean;
  headers: { Authorization: string; Token: string };
}) => {
  console.log(request)
  return request;
};
const responseInterceptors = async (response: any) => {
  const {
    status,
    data: { code },
    config: { customHandleRes, skipErrorHandler },
  } = response;
  console.log(response)
  if (status == 200) {
    return response;
  } else {
    return Promise.reject(response);
  }
};
const errorHandler = (response: any) => {
  return response;
};
export const requestConfig = {
  paramsSerializer: (params: { [x: string]: any }) => {
    const { current: page, pageSize: limit, ...rest } = params;
    if (params?.current || params?.pageSize) {
      params = { limit, page, ...rest };
    }
    const newParams = {};
    keys(params)?.forEach((key) =>
      set(
        newParams,
        key,
        isArray(params[key]) && !params[key].length
          ? JSON.stringify(params[key])
          : params[key],
      ),
    );
    return queryString.stringify(newParams, {
      arrayFormat: 'comma',
    });
  },
  baseURL: 'http://127.0.0.1:7001/',
  retryTimes: 3,
  timeout: 10 * 1000,
  // getResponse: true,
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [
    responseInterceptors,
    (response: any) => {
      const { code } = response.data;
      if (code == 200) {
        return response;
      }
      return Promise.reject(response);
    },
  ],
  errorConfig: { errorHandler },
};