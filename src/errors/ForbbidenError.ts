import { BaseError } from "./BaseError";

export class ForbbidenError extends BaseError {
    constructor(
        message: string = "Usuário não autenticado" // ROLE ERRADO
    ) {
        super(403, message)
    }
}