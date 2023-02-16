import { BaseDatabase } from "./BaseDatabase"
import { PostsDB } from "../types"

export class PostsDatabase extends BaseDatabase{
    // public static TABLE_POSTS = "posts"

    // public async findUserByName(q: string | undefined) {
    //     let postsDB

    //     if (q) {
    //         const result: PostsDB[] = await BaseDatabase
    //             .connection(PostsDatabase.TABLE_POSTS)
    //             .where("name", "LIKE", `%${q}%`)

    //         postsDB = result
    //     } else {
    //         const result: PostsDB[] = await BaseDatabase
    //             .connection(PostsDatabase.TABLE_POSTS)

    //         postsDB = result
    //     }

    //     return postsDB
    // }

    // public async findUserById(id: string) {
    //     const [ PostsDB ]: PostsDB[] | undefined[] = await BaseDatabase
    //         .connection(PostsDatabase.TABLE_POSTS)
    //         .where({ id })

    //     return PostsDB
    // }

    // public async insertUser(newPostsDB: PostsDB) {
    //     await BaseDatabase
    //         .connection(PostsDatabase.TABLE_POSTS)
    //         .insert(newPostsDB)
    // }
}