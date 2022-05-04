import axios from 'axios';
import { AUTHORIZATION, AUTH_TYPE, METHOD } from '@/constant';

// 跨域认证信息 header 名

const fetch = axios.create({
  baseURL: process.env.apiUrl,
  xsrfHeaderName: AUTHORIZATION,
  timeout: 5000,
  withCredentials: true,
});

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url: string, method: any, params: any, config: any) {
  switch (method) {
    case METHOD.GET:
      return fetch.get(url, { params, ...config });
    case METHOD.POST:
      return fetch.post(url, params, config);
    case METHOD.PUT:
      return fetch.put(url, params, config);
    case METHOD.DELETE:
      return fetch.delete(url, params);
    case METHOD.PATCH:
      return fetch.patch(url, params, config);
    default:
      return fetch.get(url, { params, ...config });
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth: any, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      localStorage.setItem(AUTHORIZATION, `${authType} ` + auth.token);
      break;
    case AUTH_TYPE.BASIC:
      localStorage.setItem(AUTHORIZATION, `${authType} ${auth.token}`);
      break;
    default:
      break;
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      localStorage.removeItem(AUTHORIZATION);
      break;
    case AUTH_TYPE.BASIC:
      localStorage.removeItem(AUTHORIZATION);
      break;
    default:
      break;
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (localStorage.getItem(AUTHORIZATION)) {
        return true;
      }
      break;
    case AUTH_TYPE.BASIC:
      if (localStorage.getItem(AUTHORIZATION)) {
        return true;
      }
      break;
    default:
      break;
  }
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors: any, options: any) {
  const { request, response } = interceptors;
  // 加载请求拦截器
  request.forEach((item: any) => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (config: any) => config;
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error: any) => Promise.reject(error);
    }
    fetch.interceptors.request.use(
      (config) => onFulfilled(config, options),
      (error) => onRejected(error, options),
    );
  });
  // 加载响应拦截器
  response.forEach((item: any) => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (response: any) => response;
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error: any) => Promise.reject(error);
    }
    fetch.interceptors.response.use(
      (response) => onFulfilled(response, options),
      (error) => onRejected(error, options),
    );
  });
}

export {
  METHOD,
  AUTH_TYPE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
};
