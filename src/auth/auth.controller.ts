import { BadRequestException, Body, Controller, FileTypeValidator, Get, Headers, MaxFileSizeValidator, Param, ParseFilePipe, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { UserAuth } from "src/decorators/user.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from 'fs/promises'
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ) {}
    

    @Post('login')
    async login(@Body() body:AuthLoginDTO){
        return this.authService.login(body.login, body.password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body.email, body.login, body.password, body.role);
    }

    @Post('forget') 
    async forget_password(@Body() body: AuthForgetDTO ){
        return this.authService.forget(body.email);
    }

    @Post('reset')
    async reset_password(@Body() body: AuthResetDTO){
        return this.authService.reset(body.password, body.token)
    }


    // usando guardas 
    // AuthGuard -> validar se esta sendo usado o token para uso da rota
    // Role guard para validar se o token usado, é de um usuário que tem a permissão(Role) do Enum referente ao decorator @Roles(Role.Admin) 
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get()
    async valida_token(@UserAuth() userauth_data : any, @Request() request : any){
        
        return {token_data: request.token_data, user_data: userauth_data};
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async upload_photo(
        @UserAuth() userauth_data : any, 
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: 'image/png'}),
                new MaxFileSizeValidator({maxSize: 1024 * 20})
            ]
        })) photo : Express.Multer.File){
        
        try {
            await this.fileService.upload(photo);
        } catch (e) {
            throw new BadRequestException(e)
        }

        return {"success": true}
    }


}