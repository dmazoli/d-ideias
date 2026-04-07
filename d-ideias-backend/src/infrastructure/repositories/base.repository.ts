import { FindOptionsWhere, Repository } from 'typeorm';
import type { DeepPartial } from 'typeorm';
import type { IBaseRepository } from '../../domain/repositories';

export class BaseRepository<
  T extends { id?: TId },
  TId,
> implements IBaseRepository<T, TId> {
  constructor(protected readonly repository: Repository<T>) {}

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async findById(id: TId): Promise<T | null> {
    return this.repository.findOne({
      where: {
        id,
      } as FindOptionsWhere<T>,
    });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async update(id: TId, entity: Partial<T>): Promise<T | null> {
    const currentEntity = await this.findById(id);

    if (!currentEntity) {
      return null;
    }

    const updatedEntity = this.repository.merge(
      currentEntity,
      entity as DeepPartial<T>,
    );

    return this.repository.save(updatedEntity);
  }

  async deleteById(id: TId): Promise<boolean> {
    const result = await this.repository.delete({
      id,
    } as FindOptionsWhere<T>);

    return (result.affected ?? 0) > 0;
  }
}
