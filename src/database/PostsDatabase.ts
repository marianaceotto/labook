import { BaseDatabase } from "./BaseDatabase"
import { PostsDB } from "../types"

export class PostsDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async findPostByName(q: string | undefined){
        let postsDB

        if (q) {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostsDatabase.TABLE_POSTS)
                .where("name", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostsDatabase.TABLE_POSTS)
            postsDB = result    
        }
    }

    public async findPostById(id: string) {
        const [ PostsDB ]: PostsDB[] | undefined[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .where({ id })

        return PostsDB
    }

    public async insertPost(newPostDB: PostsDB) {
        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }
}