import {MigrationInterface, QueryRunner} from "typeorm";

export class BookMigration1562705763025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `author` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `subtitle` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `book`");
    }

}
