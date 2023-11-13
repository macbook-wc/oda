
import axios from "axios";
import { get, post } from './request.js';
export const getHomepageInfo = (p) => get('/api/home/info', p);
export const getProductDetail = (p) => get(`/api/product/info/${p.id}`, p);
export const downloadFile = (url) => axios({
      url,
      responseType: "blob", // 返回类型为blob
});
export const register = (p) => post('/api/user/register', p,true);
export const login = (p) =>post('/api/user/login', p, false);
