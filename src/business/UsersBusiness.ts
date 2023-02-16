import { UsersDatabase } from "../database/UsersDatabase"
import { LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/usersDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, UsersDB, USER_ROLES } from "../types"

export class UserBusiness {
    constructor(
        private userDatabase: UsersDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const {name, email, password} = input

        if (typeof name !== "string"){
            throw new BadRequestError("'Name' deve ser string")
        }

        if(typeof email !== "string"){
            throw new BadRequestError("'E-mail' deve ser string")
        }

        if (typeof password !== "string"){
            throw new BadRequestError("'Password' deve ser string")
        }

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new Users (
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const output: SignupOutput = {
            token: this.tokenManager.createToken(payload)
        }

        return output
    }

    public login = async (input: LoginInput): Promise <LoginOutput> => {
        const {email, password} = input

        if (typeof email !== "string"){
            throw new BadRequestError("'E-mail' deve ser string")
        }

        if (typeof password !== "string"){
            throw new BadRequestError("'Password' deve ser string")
        }

        const userDB: UsersDB | undefined = await this.userDatabase.findByEmail(email)

        if(!userDB) {
            throw new NotFoundError("'E-mail' não cadastrado")            
        }

        const users = new Users (
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const hashedPassword = users.getPassword()
        const isPasswordCorrect = await this.hashManager
            .compare(password, hashedPassword)
        
        if (!isPasswordCorrect) {
            throw new BadRequestError("'Password' incorreta")
        }
        
        const payload: TokenPayload = {
            id: users.getId(),
            name: users.getName(),
            role: users.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutput = {
            token
        }

        return output
    }
}