import { Book } from './src/entities';
import { DatabaseType } from 'typeorm';

export = {
    type: 'mysql' as any,
    url: 'mysql://user:password@127.0.0.1:3306/test',
    database: 'test',
    entities: [Book],
    migrations: ['src/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration',
    },
    migrationsRun: true
};
