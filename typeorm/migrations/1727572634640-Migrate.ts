import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1727572634640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
           name: "users_auth",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    unsigned: true
                },
                {
                    name: "login",
                    type: "varchar",
                    length: "60"
                },
                {
                    name: "pass",
                    type: "longtext",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,   
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP()"
                },
                {
                    name: "role",
                    type: "int",
                    length: "11"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_auth');
    }

}
