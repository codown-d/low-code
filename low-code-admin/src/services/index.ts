import { request } from '@umijs/max';
import api from './api';

export async function listFiles(
  params?: any,
  options?: { [key: string]: any },
) {
  return request<any>(api.listFiles, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function jsonFile(
  params: {
    fileName: string;
  },
  options?: { [key: string]: any },
) {
    console.log(123)
  return request<any>(api.jsonFile, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
