import { message } from 'antd';
import { NoopFunction } from '@/services';
import { operateMap } from '@/constant';

export enum ErrMap {
  list = 'list',
  create = 'create',
  update = 'update',
  login = 'login',
}

export const operateSuccess = (type: string, callback?: NoopFunction) => {
  message.success(`${operateMap[type]}成功`);
  callback?.();
};

export const operateFailed = (type: string, callback?: NoopFunction) => {
  message.success(`${operateMap[type]}失败`);
  callback?.();
};

export const getControllerErrMsg = (
  type: ErrMap,
  column: string,
  code: number,
  msg?: string,
) => {
  switch (type) {
    case ErrMap.list:
      return `获取${column}列表失败 -- ${code}`;
    case ErrMap.create:
      return `新增${column}失败 -- ${code}`;
    case ErrMap.update:
      return `编辑${column}失败 -- ${code}`;
    default:
      return msg || `${column}失败 -- ${code}${msg}`;
  }
};
