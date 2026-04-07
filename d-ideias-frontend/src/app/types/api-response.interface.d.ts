interface PaginationMeta {
  count: number;
  page: number;
  pageSize: number;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
