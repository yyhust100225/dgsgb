//axiosInstance.js
//导入axios
import axios from 'axios';
import { message } from 'ant-design-vue';
import { goLoginPage, goHomePage } from '@/common/functions';

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    // 'Authorization': bearerToken,
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (typeof config.headers !== 'undefined')
      config.headers['Authorization'] = localStorage.getItem('accessToken');
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    // const code = dataAxios.reset
    // console.log('axios-data: ', dataAxios);
    if (dataAxios.code === 10000 && dataAxios.status === 'success')
      return dataAxios;
    else if (dataAxios.code === 10429) {
      message.error(dataAxios.message, 2, () => {
        goHomePage();
      })
    }
    else {
      // todo 请求失败
      return false;
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
      message.error("权限验证失败，请重新登陆", 2, () => {
        localStorage.setItem('accessToken', '');
        goLoginPage();
      });
      // todo 跳转登陆页
    } else if (error.response.status === 400) {
      message.error(error.response.data.message);
    }

    return Promise.reject(error)
  }
)

//导出我们建立的axios实例模块，ES6 export用法
export default service
