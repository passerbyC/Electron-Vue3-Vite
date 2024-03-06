import { ElMessage } from "element-plus";
import axios from "axios";
const request = axios.create({
  baseURL:
    import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === "true"
      ? "/api"
      : import.meta.env.VITE_APP_API_BASEURL,
  responseType: "json",
});

// 全局请求拦截器
request.interceptors.request.use(
  (config) => {
    config.headers['token'] = 'token' + new Date().valueOf();
    return config;
  },
  (err) => {
    return Promise.resolve({
      code: 500,
      message: "访问出现错误",
      err,
    });
  }
);

request.interceptors.response.use(
  (response) => {
    if (response.data.status === 200) {
      // 请求成功并且没有报错
      return Promise.resolve(response.data);
    } else {
      // 这里做错误提示
      ElMessage.error(response.data)
      return Promise.reject(response.data);
    }
  },
  (error) => {
    let message = error.message;
    if (message == "Network Error") {
      message = "后端网络故障";
    } else if (message.includes("timeout")) {
      message = "接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage.error(message)
    return Promise.reject(error);
  }
);

export default request;
