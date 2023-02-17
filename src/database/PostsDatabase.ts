import { DeletePostsInput } from "../dtos/postsDTO"
import { PostsCreatorsDB, PostsDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class PostsDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public getPostsCreators = async (): Promise <PostsCreatorsDB[]> => {
        const result: PostsCreatorsDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"
            ).join ("users", "posts.creator_id", "=", "users.id")

        return result
    }

    public insert =async (postsDB: PostsDB): Promise <void> => {
        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .insert(postsDB)
    }

    public findById = async (id: string): Promise <PostsDB | undefined> => {
        const result: PostsDB[] = await BaseDatabase
        .connection (PostsDatabase.TABLE_POSTS)
        .select()
        .where({id}) 
        
        return result [0]
    }

    public update = async (id: string, postsDB: PostsDB): Promise <void> => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .update(postsDB)
        .where({id})        
    }

    public delete = async (id: string): Promise <void> => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .delete()
        .where ({id})        
    }
}