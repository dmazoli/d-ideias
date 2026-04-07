import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ideas')
@Check(
  'CHK_ideas_authorRegister_unsigned_max_99999',
  '"authorRegister" > 0 AND "authorRegister" <= 99999',
)
export class Idea {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('integer')
  authorRegister!: number;

  @Column('text')
  improvementSuggestion!: string;

  @Column('text')
  currentProcess!: string;

  @Column('text')
  howToImplement!: string;

  @Column('text')
  expectedBenefits!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
