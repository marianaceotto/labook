import { PostsModel } from "../types"

export interface GetPostsInput {
    token: string | undefined
}

export type GetPostsOutput = PostsModel[]


export interface CreatePostsInput {
    token: string | undefined,
    content: unknown
}

export interface EditPostsInput {
    idToEdit: string,
    token: string | undefined
    content: unknown
}

export interface DeletePostsInput {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikeInput {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}
