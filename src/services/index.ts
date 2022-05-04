export function authorize(token: string) {
  console.log('authorize');
}

export const MaxPageSize = 100000;

export interface PageParams {
  // 页码
  pageNum?: number;
  // 每页条数
  pageSize?: number;
}

export interface PageQuery {
  pageSize: number;
  currPage: number;
}

export interface Pages {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
}

export interface lfResponse {
  code: number;
  msg: string;
}

export type strObject = {
  [x: string]: string;
};

export const INIT_PAGE_PARAMS: PageParams = {
  pageNum: 1,
  pageSize: 10,
};

export type NoopFunction = (value?: any) => void;
