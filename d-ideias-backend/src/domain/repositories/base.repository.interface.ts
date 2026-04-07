export interface IBaseRepository<T, TId> {
  save(entity: T): Promise<T>;
  findById(id: TId): Promise<T | null>;
  findAll(page: number, pageSize: number): Promise<T[]>;
  count(): Promise<number>;
  update(id: TId, entity: Partial<T>): Promise<T | null>;
  deleteById(id: TId): Promise<boolean>;
}
