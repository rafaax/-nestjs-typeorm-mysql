import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    
    @IsString()
    name: string;
    
    @IsEmail()    
    email: string;

    @IsString()
    dob: string;

    @IsString()
    cep: string;

    @IsOptional()
    @IsString()
    cnpj: string;
}