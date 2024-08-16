export interface FindResponseType<T> {
  data: T;
  total?: number;
  page?: number;
  totalPages?: number;
}
