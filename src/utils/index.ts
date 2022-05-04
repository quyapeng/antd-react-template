import moment, { Moment } from 'moment';
import { Decimal } from 'decimal.js';
import { SpaceProps } from 'antd/es/space';
import { apiCommonBase } from '@/constant';

export * from './message';

const baseFormat = 'YYYY-MM-DD HH:mm:ss';

export const numberFormat = (value: number | undefined, unit = '') => {
  if (!value && value !== 0) return '-';
  return value.toString().replace(/(-?\d+)(\d{3})/, `$1,$2`) + unit;
};

export const getTimeFormat = (
  time: moment.MomentInput,
  format = baseFormat,
) => {
  return moment(time).format(format);
};

export const getStartEndTimeFormat = (
  timeRange: Moment[],
  format = baseFormat,
) => {
  return (timeRange as Moment[])?.map((item) => item.format(format)) || [];
};

export const getStartEndTimeJoin = (
  timeRange: Moment[],
  format = baseFormat,
  join = ' ~ ',
) => {
  return getStartEndTimeFormat(timeRange, format).join(join);
};

export const getNumberPercent = (value: number | undefined): string => {
  if (!value && value !== 0) return '-';
  const res = Decimal.mul(value, 100);
  return `${res}%`;
};

export const downloadFile = (url: string) => {
  try {
    const linkElement = document.createElement('a');
    linkElement.style.display = 'none';
    linkElement.href = url;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  } catch (e) {
    throw Error('下载文件异常！');
  }
};

export const getTokenDecode = () => {
  const token = localStorage.getItem('token');
  if (token) return 'token';
  return null;
};

type SpaceDirection = 'horizontal' | 'vertical';
export const getSpaceProps = (
  size = 15,
  maxWidth = true,
  direction: SpaceDirection = 'vertical',
): SpaceProps => {
  const baseProps = {
    direction,
    size,
  };
  if (!maxWidth) return baseProps;
  return {
    direction: 'vertical' || direction,
    style: { width: '100%' },
    size,
  };
};

export const getApiSuffixByServiceName = (serviceName: string): string => {
  return serviceName === 'loginService' ? '' : apiCommonBase;
};

export const disabledDate = (current: Moment) =>
  current && current > moment().endOf('ms');
