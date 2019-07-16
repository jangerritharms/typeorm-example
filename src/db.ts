import { createConnection, Connection, getConnection } from 'typeorm';
import config from '../ormconfig';
import { Book } from './entities';

let dbConnection: Connection;

export interface DBConnectionOptions {
    retries: number;
    delay: number;
    factor: number;
}

export async function makeDBConnection(
    options: DBConnectionOptions
): Promise<Connection> {
    try {
        dbConnection = await createConnection(config);
    } catch(e) {
        if (options.retries <= 0) {
            throw e;
        }
        console.log("Retrying");
        options.retries -= 1;
        return await new Promise((resolve: any) => {
            setTimeout(() => {
                options.delay *= options.factor;
                resolve(makeDBConnection(options));
            }, options.delay);
        });
    }

    return dbConnection;
}

export async function reconnect() {
    const defaultConnection = getConnection(); 
    await defaultConnection.close();
    await makeDBConnection({
        retries: 5,
        delay: 1000,
        factor: 2,
    });
}

export async function getDBConnection(): Promise<Connection> {
    const conn = getConnection();

    return new Promise((resolve, reject) => {
        (conn.driver as any).pool.getConnection(function(err: any, mysql: any) {
            if (err) {
                reconnect();
                return reject("Not connected anymore");
            }
            mysql.release();
            return resolve(conn);
        });
    });
}
