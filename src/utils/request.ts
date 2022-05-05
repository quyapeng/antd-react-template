import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { AUTH_TYPE, xsrfHeaderName } from '@/constant';

// 跨域认证信息 header 名

const fetch: any = axios.create({
  baseURL: process.env.apiUrl,
  xsrfHeaderName,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});

// 请求拦截
fetch.interceptors.request.use(
  (config: any) => {
    console.log('config', config);
    if (config.params) {
      for (const item in config.params) {
        if (item === null) {
          delete config.params[item];
        }
      }
    }
    if (config && config.url === 'login/oauth/token') {
      // basic Y2xpZW50OjEyMzQ1Ng==
      config.headers[
        xsrfHeaderName
      ] = `${AUTH_TYPE.BASIC} Y2xpZW50OjEyMzQ1Ng==`;
    } else {
      if (config && config.headers) {
        const loginToken = localStorage.getItem(xsrfHeaderName);
        if (loginToken) {
          config.headers[xsrfHeaderName] = loginToken;
        }
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截
fetch.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('interceptors', response);
    const { status } = response;
    switch (status) {
      case 200: //正常数据
        return response;
      case 400: //登录超时
        window.location.href = `${window.location.origin}`;
        return Promise.reject(response);
    }
    // message.error(response.data.message)
    // return Promise.reject(new Error(response.data.message))
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
// async function request(url: string, method: any, params: any, config: any) {
// switch (method) {
//   case METHOD.GET:
//     return fetch.get(url, { params, ...config });
//   case METHOD.POST:
//     return fetch.post(url, params, config);
//   case METHOD.PUT:
//     return fetch.put(url, params, config);
//   case METHOD.DELETE:
//     return fetch.delete(url, params);
//   case METHOD.PATCH:
//     return fetch.patch(url, params, config);
//   default:
//     return fetch.get(url, { params, ...config });
// }
// }

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth: any, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      localStorage.setItem(xsrfHeaderName, `${authType} ` + auth.token);
      break;
    case AUTH_TYPE.BASIC:
      localStorage.setItem(xsrfHeaderName, `${authType} ${auth.token}`);
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
      localStorage.removeItem(xsrfHeaderName);
      break;
    case AUTH_TYPE.BASIC:
      localStorage.removeItem(xsrfHeaderName);
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
      if (localStorage.getItem(xsrfHeaderName)) {
        return true;
      }
      break;
    case AUTH_TYPE.BASIC:
      if (localStorage.getItem(xsrfHeaderName)) {
        return true;
      }
      break;
    default:
      break;
  }
}

export {
  AUTH_TYPE,
  fetch,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
};
