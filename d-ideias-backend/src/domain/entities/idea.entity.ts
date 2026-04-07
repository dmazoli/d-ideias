import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ideas')
export class Idea {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('smallint')
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
