import { Request } from "express";
import { PostsBusiness } from "../business/PostsBusiness";

export class PostsController {
    constructor(
        private postsBusiness: PostsBusiness
    ){}
    public getPosts = async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }

    public createPost = async (req: Request, res: Response) => {

    }

    public editPost = async (req: Request, res: Response) => {

    }

    public deletePost = async (req: Request, res: Response) => {

    }

    public likeOrDislikePost = async (req: Request, res: Response) => {

    }
}