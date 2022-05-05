import { fetch } from '@/utils/request';
import qs from 'qs';

export interface LoginParams {
  grant_type: string;
  scope: string;
  username: string;
  password: string;
}

interface UserInfo {
  permissions: string[];
  user_id: number;
  username: string;
}

interface LoginResponse {
  token: string;
}

interface RequestConfig {}
export function login(params: LoginParams) {
  // return axios.post<LoginResponse>(`login/oauth/token`, params, config);
  return fetch.post(`login/oauth/token`, `${qs.stringify(params)}`);
}
