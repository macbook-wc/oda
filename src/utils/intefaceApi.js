import { get, post } from './request.js';
export const getHomepageInfo = (p) => get('/api/home/info', p);
export const getProductDetail = (p) => get(`/api/product/info/${p.id}`, p);
export const downloadFile = (p) => get(`/api/product/download/${p.id}`,p,{responseType: 'blob'},);
export const register = (p) => post('/api/user/register', p,true);
export const login = (p) =>post('/api/user/login', p, false);
