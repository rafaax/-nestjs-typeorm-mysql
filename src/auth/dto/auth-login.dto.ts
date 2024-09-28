import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class AuthLoginDTO {
    
    @IsString()
    login:string

    @IsString()
    password:string
}