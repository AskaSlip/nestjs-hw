import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBio1729269027867 implements MigrationInterface {
    name = 'AddBio1729269027867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
    }

}
