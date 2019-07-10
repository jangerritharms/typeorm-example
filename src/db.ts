import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { Book } from './entities';

let dbConnection;

export async function makeDBConnection() {
    dbConnection = await createConnection(config);

    return dbConnection;
}

export function getConnection() {}
