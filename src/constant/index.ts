// 手机号校验
export const PHONE_REG_ZH = /^1[3456789]\d{9}$/;

export const EMAIL_REG =
  /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;

export const envMap = { local: 'envMap', stg: 'stg' };

export const AES_KEY = 'AES_KEY';

export const SERVICE_URL = 'apiCommonBase';

export const AUTHORIZATION = 'Authorization';

// 认证类型
export const AUTH_TYPE = {
  BEARER: 'bearer',
  BASIC: 'basic',
};

// http method
export const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

export type stringObject = {
  [x: string]: string;
};
export const operateMap: stringObject = {
  operate: '操作',
  create: '新增',
  modify: '编辑',
  delete: '删除',
};
