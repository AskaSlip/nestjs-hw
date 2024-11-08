import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1731086877220 implements MigrationInterface {
    name = 'AddIndex1731086877220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_af90adc46c549b2a7ee83c6e44" ON "likes" ("user_id", "article_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_af90adc46c549b2a7ee83c6e44"`);
    }

}
