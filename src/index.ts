import { makeDBConnection } from "./db";
import { Book } from "./entities";

async function main() {
    const db = await makeDBConnection()

    const book = new Book();
    book.author = "Trevor Noah";
    book.title = "Born a crime";
    book.subtitle = "";

    await db.manager.save(book);
}

main().then(() => console.log("Done")).catch(err => console.error("Main exited with error: ", err));
