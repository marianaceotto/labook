//---- TOKEN MANAGER
export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
} 

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
} 

//----

export interface UsersDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UsersModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface PostsDB {
    id: string,
    creator_id: string
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface PostsModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface PostsCreatorsDB extends PostsDB {
    creator_name: string
}

