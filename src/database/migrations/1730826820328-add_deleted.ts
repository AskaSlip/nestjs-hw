import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleted1730826820328 implements MigrationInterface {
    name = 'AddDeleted1730826820328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}
