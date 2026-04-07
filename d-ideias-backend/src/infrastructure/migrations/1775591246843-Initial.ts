import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1775591246843 implements MigrationInterface {
  name = 'Initial1775591246843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ideas" ("id" SERIAL NOT NULL, "authorRegister" integer NOT NULL, "improvementSuggestion" text NOT NULL, "currentProcess" text NOT NULL, "howToImplement" text NOT NULL, "expectedBenefits" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_ideas_authorRegister_unsigned_max_99999" CHECK ("authorRegister" > 0 AND "authorRegister" <= 99999), CONSTRAINT "PK_6ab43f1e9b1cef0d8f3e56ce3a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD "upvotes" integer NOT NULL DEFAULT '0' CHECK ("upvotes" >= 0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD "downvotes" integer NOT NULL DEFAULT '0' CHECK ("downvotes" >= 0)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ideas"`);
  }
}
