import React from 'react';
import { Redirect } from 'umi';
import { getTokenDecode } from '@/utils';

function RoleAuth({ children }: { children: React.ReactNode }) {
  const tokenDecode: any = getTokenDecode();
  if (!tokenDecode) return <Redirect to="/login" />;
  const role = tokenDecode.roleName;
  if (role !== 'admin') return <Redirect to="/404" />;
  return children;
}
export default RoleAuth;
