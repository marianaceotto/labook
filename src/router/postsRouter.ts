import express from "express"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsController } from "../controller/PostsController"
import { PostsDatabase } from "../database/PostsDatabase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

// postsRouter.get("/", postsController.getPosts)
// postsRouter.post("/", postsController.createPost)
// postsRouter.put("/:id", postsController.editPost)
// postsRouter.delete("/:id", postsController.deletePost )
// postsRouter.put("/:id/like", postsController.likeOrDislikePost)

