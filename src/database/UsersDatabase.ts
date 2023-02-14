import { UsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUserByName(q: string | undefined) {
        let usersDB

        if (q) {
            const result: UsersDB[] = await BaseDatabase
                .connection(UsersDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)

            usersDB = result
        } else {
            const result: UsersDB[] = await BaseDatabase
                .connection(UsersDatabase.TABLE_USERS)

            usersDB = result
        }

        return usersDB
    }

    public async findUserById(id: string) {
        const [ UsersDB ]: UsersDB[] | undefined[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .where({ id })

        return UsersDB
    }

    public async insertUser(newUsersDB: UsersDB) {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(newUsersDB)
    }
}