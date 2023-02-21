import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostsInput, DeletePostsInput, EditPostsInput, GetPostsInput, GetPostsOutput, LikeOrDislikeInput } from "../dtos/postsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { ForbbidenError } from "../errors/ForbbidenError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { LikesDislikesDB, PostsCreatorsDB, PostsDB, POSTS_LIKE, USER_ROLES } from "../types"

export class PostsBusiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getPlaylist = async (input: GetPostsInput): Promise <GetPostsOutput> => {
        const { token } = input

        if (!token){
            throw new BadRequestError("'Token' ausente");
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido");
        } 

        const postsCreatorsDB: PostsCreatorsDB[] = 
            await this.postsDatabase.getPostsCreators()

        const posts = postsCreatorsDB.map((postCreatorDB) => {
            const post = new Posts(
                postCreatorDB.id,
                postCreatorDB.content,
                postCreatorDB.likes,
                postCreatorDB.dislikes,
                postCreatorDB.created_at,
                postCreatorDB.updated_at,
                postCreatorDB.creator_id,
                postCreatorDB.creator_name
            )
            
            return post.toBusinessModel()
        })

        const output: GetPostsOutput = posts

        return output
    }

    public createPost = async (input: CreatePostsInput): Promise <void> => {
        const { token, content } = input

        if (token === undefined){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        if (content === null) {
            throw new BadRequestError("'Conteúdo' vazio")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'Content' deve ser string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name


        const post = new Posts(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        )
     
        const postsDB = post.toDBModel()

        await this.postsDatabase.insert(postsDB)
    }


    public editPost =async (input: EditPostsInput): Promise <void> => {
        const { idToEdit, token, content} = input

        if (!token){
            throw new BadRequestError("'Token' ausente")
        }
        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido");
        }

        if (content === null) {
            throw new BadRequestError("'Content' vazio")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'Content' deve ser string")
        }

        const postDB = await this.postsDatabase.findById(idToEdit)

        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = payload.id
        const creatorName = payload.name

        if (postDB.creator_id !== creatorId) {
            throw new ForbbidenError("Acesso negado. Somente o criador pode editar este post")
        }
      
        const post = new Posts(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId,
            creatorName
        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const updatedPostDB = post.toDBModel()

        await this.postsDatabase.update(idToEdit, updatedPostDB)
    }


    public deletePost =async (input: DeletePostsInput): Promise <void> => {
        const { idToDelete, token } = input

        if (!token){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido")
        }

        const postDB = await this.postsDatabase.findById(idToDelete)

        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = payload.id

        if (payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== creatorId) {
            throw new ForbbidenError("Acesso negado. Somente o criador ou admin podem deletar este post")
        }

        await this.postsDatabase.delete(idToDelete)
    }

    public likeOrDislikePost =async (input: LikeOrDislikeInput): Promise <void> => {
        const { idToLikeOrDislike, token, like } = input

        if (!token){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' inválido")
        }

        if(typeof like !== "boolean"){
            throw new BadRequestError("'Like' deve ser boolean")
        }

        const postsCreatorsDB = await this.postsDatabase.findPostsCreatorsById(idToLikeOrDislike)

        if (!postsCreatorsDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const userId = payload.id
        const likesSended = like ? 1 : 0

        const likesDislikes: LikesDislikesDB = {
            user_id: userId,
            post_id: postsCreatorsDB.id,
            like: likesSended
        }

        const posts = new Posts(
            postsCreatorsDB.id,
            postsCreatorsDB.content,
            postsCreatorsDB.likes,
            postsCreatorsDB.dislikes,
            postsCreatorsDB.created_at,
            postsCreatorsDB.updated_at,
            postsCreatorsDB.creator_id,
            postsCreatorsDB.creator_name
        )

        const likeDislikeExists = await this.postsDatabase.findLikesDislikes(likesDislikes)

        if(likeDislikeExists === POSTS_LIKE.ALREADY_LIKED){
            if (like) {             
                await this.postsDatabase.removeLikeDislike(likesDislikes)
                posts.removeLike()
            } else {
                await this.postsDatabase.updateLikeDislike(likesDislikes)
                posts.removeLike()
                posts.addDislike()
            }

        } else if (likeDislikeExists === POSTS_LIKE.ALREADY_DISLIKED) {
            if (like) {             
                await this.postsDatabase.updateLikeDislike(likesDislikes)
                posts.removeDislike()
                posts.addLike()
            } else {
                await this.postsDatabase.removeLikeDislike(likesDislikes)
                posts.removeDislike()
            }

        } else {
            await this.postsDatabase.likesOrDislikesPosts(likesDislikes)
            like ? posts.addLike() : posts.addDislike()
        }

        const updatedPost = posts.toDBModel()
        await this.postsDatabase.update(idToLikeOrDislike, updatedPost)
    }
}
