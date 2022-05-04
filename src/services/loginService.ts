import { METHOD, request } from '@/utils/request';

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
  user_info: UserInfo;
}

interface RequestConfig {}
export function login(params: LoginParams, config?: RequestConfig) {
  // return axios.post<LoginResponse>(`login/oauth/token`, params, config);
  return request(`login/oauth/token`, METHOD.POST, params, config);
}
