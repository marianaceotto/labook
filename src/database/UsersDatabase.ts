import { BaseDatabase } from "./BaseDatabase"
import { UsersDB } from "../types"

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findByEmail = async (email: string): Promise<UsersDB | undefined>  => {
        const result: UsersDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }


    public async insert (userDB: UsersDB): Promise<void> {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(userDB)
    }
}