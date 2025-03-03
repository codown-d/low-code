import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
    baseURL: 'https://your-api-url.com', // 设置默认的 API 基础路径
    timeout: 5000, // 设置请求超时时间
    headers: {
        'Content-Type': 'application/json',
        // 可以在此处添加其他常见请求头
    },
});

// 请求拦截器：可以在发送请求前对请求进行一些处理
instance.interceptors.request.use(
    (config) => {
        // 这里可以加一些公共的请求头，例如 token 等
        const token = localStorage.getItem('token'); // 假设我们从 localStorage 获取 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器：可以在收到响应时进行统一的处理
instance.interceptors.response.use(
    (response) => {
        // 如果需要对返回数据做统一处理
        return response.data; // 返回 response.data，减少后续每次都取 data 的代码
    },
    (error) => {
        // 统一错误处理
        if (error.response) {
            // 请求已发出，但服务器响应状态码不在 2xx 范围内
            console.error(`Error ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error('No response received:', error.request);
        } else {
            // 其他错误
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    },
);
const uploadFile = (url, file) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' 是后端接口中接收文件的字段名
    return instance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 指定上传文件的类型
        },
    });
};

// 封装请求方法
const api = {
    get: (url, params = {}) => instance.get(url, { params }),
    post: (url, data = {}) => instance.post(url, data),
    put: (url, data = {}) => instance.put(url, data),
    delete: (url, data = {}) => instance.delete(url, { data }),
    uploadFile,
    // 可以根据需求添加更多封装方法，例如 patch、upload 等
};

export default api;
