import express from "express"
import { UserBusiness } from "../business/UsersBusiness"
import { UsersController } from "../controller/UsersController"
import { UsersDatabase } from "../database/UsersDatabase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UsersController(
    new UserBusiness(
        new UsersDatabase(),
        new IdGenerator(),
	    new TokenManager(),
	    new HashManager()
    )
)

userRouter.post("/signup", userController.singup)
userRouter.post("/login", userController.login)
