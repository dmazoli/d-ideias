interface PaginatedResponse<T> {
  data: T[];
  meta: {
    count: number;
    page: number;
    pageSize: number;
  };
}
