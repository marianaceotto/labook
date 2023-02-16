import { Request, Response } from "express";
import { UserBusiness } from "../business/UsersBusiness";
import { BaseError } from "../errors/BaseError";
import { LoginInput, SignupInput } from "../dtos/usersDTO"

export class UsersController {
    constructor(
        private userBusiness: UserBusiness
    ){}

    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInput = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.name              
            }

            const output = await this.userBusiness.signup(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: LoginInput = {
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.login(input)
            
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
}