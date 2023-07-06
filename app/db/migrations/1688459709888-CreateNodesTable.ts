import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNodesTable1688459709888 implements MigrationInterface {
    name = 'CreateNodesTable1688459709888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nodes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "properties" json NOT NULL, CONSTRAINT "PK_682d6427523a0fa43d062ea03ee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nodes"`);
    }

}
