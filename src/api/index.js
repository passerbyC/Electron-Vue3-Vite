import request from "@/utils/request";
//登录返回用户信息
export const getUserInfo = (params) => { 
  return request.post("/users/login", params);
};

