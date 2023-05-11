import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { filterTypes, sortOrders } from './utils.js';

export type IAnyObj = {
  [key: string]: any;
};

export type IMakeEnum = <T extends ReadonlyArray<string>>(
  ...args: T
) => { [key in T[number]]: key };

export type IMakeUrlFor = <T extends object>(
  rawRoutes: T
) => (name: keyof T, routeParams?, query?) => string;

export interface IAxiosInstance extends AxiosInstance {
  request<T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export type IContext = {
  axios: IAxiosInstance;
};

type Anyify<T> = { [K in keyof T]: any };

export type ISelectOption = {
  value: any;
  label: string;
  [key: string]: any;
};
export type ISelectedOption = ISelectOption | null;

export type ISortOrder = keyof typeof sortOrders | null;
export type IFilterTypes = typeof filterTypes;

export type ISelectFilter = ISelectOption[];
export type ISearchFilter = string;

type ISelectFilterObj = {
  filterBy: string;
  filterType: IFilterTypes['select'];
  filter: ISelectFilter;
  filterOptions: ISelectFilter;
  customFilterFn?: (rowValue, filter: IMixedFilter) => boolean;
};

type ISearchFilterObj = {
  filterBy: string;
  filterType: IFilterTypes['search'];
  filter: ISearchFilter;
  customFilterFn?: (rowValue, filter: IMixedFilter) => boolean;
};

export type IFilter = ISelectFilterObj | ISearchFilterObj;

export type IMixedFilter = ISearchFilter | ISelectFilter;
export type IFiltersMap = Record<string, Anyify<IFilter> & { filterOptions?: any }>;

export type IUseTableState = {
  page?: number;
  size?: number;
  sortBy?: string | null;
  sortOrder?: ISortOrder;
  filters: IFiltersMap;
};

export type IUseTableProps<T = any> = {
  rows?: T[];
  page?: number;
  size?: number;
  sortBy?: string | null;
  sortOrder?: ISortOrder;
  filters?: IFiltersMap;
};

export type IUseTable = <T>(props: IUseTableProps<T>) => {
  rows: T[];
  totalRows: number;
  paginationProps: {
    page;
    size;
    onPageChange;
    onSizeChange;
  };
  headerCellProps: {
    sortBy;
    sortOrder;
    filters;
    onSortChange;
    onFilterChange;
  };
};

type IFn<T> = (freshState: T) => Partial<T>;
type ISetState<T> = (fnOrObject: Partial<T> | IFn<T>) => void;
export type IUseMergeState = <T>(initialState: T) => [state: T, setState: ISetState<T>];

export type IRepository = {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  stars: string;
  pushed_at: string;
  lastCommitDate: string;
  html_url: string;
  description: string;
  ownerName: string;
  ownerLink: string;
  ownerAvatar: string;
};

export type IRepositoryFull = IRepository & {
  languages: {
    name: string;
    usagePercent: number;
  }[];
};
