import axios from "axios";
import router from "@/router";
import { Toast } from "vant";

const baseURL = process.env.APP_BASE_URI;
const axiosInstance = axios.create({ timeout: 15000, baseURL });

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    Toast.fail("请求超时");
    return Promise.resolve(err);
  }
);

axiosInstance.interceptors.response.use(
  res => {
    const { code } = res.data;
    switch (code) {
      case 401:
        router.push("/login");
        break;
      case 403:
      case 500:
      case 701:
        if (data.message) 
          Toast.fail(data.message);
         else
          Toast.fail("未知错误");
        break;
      default:
        return res.data;
    }
    return res.data;
  },
  err => {
    if (err.toString().includes("timeout"))
      Toast.fail("请求超时");
    else
      Toast.fail(err.toString());
    return Promise.resolve(err);
  }
);






