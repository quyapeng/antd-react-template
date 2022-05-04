import { history } from 'umi';
import { authorize } from '@/services';

export function onRouteChange({ location }: any) {
  const { pathname } = location;
  const token = localStorage.getItem('token');
  if ((pathname === '/' || !token) && pathname !== '/login') {
    history.replace('/login');
    return;
  }
  if (token) authorize(token);
}

export function render(oldRender: Function) {
  oldRender();
}
