import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";

export class AuthRegisterDTO {

    @IsEmail()
    email:string

    @IsString()
    login:string


    @IsStrongPassword()
    password: string

    @IsOptional()
    role: any

}