import { makeDBConnection, getDBConnection } from "./db";
import { Book } from "./entities";
import { getConnection } from "typeorm";

export async function init() {
    await makeDBConnection({
        retries: 5,
        delay: 1000,
        factor: 2
    });
}

export async function main() {

    const db = await getDBConnection();

    const book = new Book();
    book.author = "Trevor Noah";
    book.title = "Don't remember"; 
    book.subtitle = "";

    if (db) {
        await db.manager.save(book);
    }

    while(true) {
        await new Promise(resolve => {
            setTimeout(async () => {
                let books, conn;

                try {
                    console.log(await (await getDBConnection()).manager.find(Book));
                } catch(e) {
                    console.error("Database unavailable");
                }

                resolve();
            }, 1000);
        });
    }
}

