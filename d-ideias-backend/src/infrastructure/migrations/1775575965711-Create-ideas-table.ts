import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdeasTable1775575965711 implements MigrationInterface {
    name = 'CreateIdeasTable1775575965711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ideas" ("id" SERIAL NOT NULL, "authorRegister" smallint NOT NULL, "improvementSuggestion" text NOT NULL, "currentProcess" text NOT NULL, "howToImplement" text NOT NULL, "expectedBenefits" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ab43f1e9b1cef0d8f3e56ce3a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ideas"`);
    }

}
