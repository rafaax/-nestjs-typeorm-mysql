import { IsEmail, IsJWT, IsString, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    
    @IsString()
    login: string

    @IsStrongPassword()
    password: string

    @IsJWT()
    token: string
    

}