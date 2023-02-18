import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreatePostsInput, DeletePostsInput, EditPostsInput, GetPostsInput, LikeOrDislikeInput } from "../dtos/postsDTO";
import { BaseError } from "../errors/BaseError";

export class PostsController {
    constructor(
        private postsBusiness: PostsBusiness
    ){}
    public getPosts = async (req: Request, res: Response) => {
        try {
            const input: GetPostsInput ={
                token: req.headers.authorization
            }
            
            const output = await this.postsBusiness.getPlaylist(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: CreatePostsInput = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postsBusiness.createPost(input)

            res.status(201).end()
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response): Promise <void> => {
        try {
            const input: EditPostsInput = {
                idToEdit: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            } 

            await this.postsBusiness.editPost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: DeletePostsInput = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            } 

            await this.postsBusiness.deletePost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {
            const input: LikeOrDislikeInput = {
                idToLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            await this.postsBusiness.likeOrDislikePost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}