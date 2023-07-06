import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDetailsTable1688463551310 implements MigrationInterface {
    name = 'CreateDetailsTable1688463551310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detail" ("id" SERIAL NOT NULL, "node4j_id" integer NOT NULL, "node_id" integer NOT NULL, CONSTRAINT "PK_28de27ee9ae6103af88ab1b3c0c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "detail"`);
    }

}
