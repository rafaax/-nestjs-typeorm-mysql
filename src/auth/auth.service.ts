import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/enums/role.enum";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { find } from "rxjs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly mailer: MailerService, 
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async createToken(user: UserEntity){
        
        return this.jwtService.sign({
            sub: user.id,
            name: user.login,
            email: user.email
        },
        {
            expiresIn: '1 day',
            issuer: 'Login',
            audience: 'users-auth'
        });
    }

    checkToken(token: string){
        try {
            const verify = this.jwtService.verify(token, {
                audience: 'users-auth', 
                issuer: 'Login'
            });

            return verify;
        }catch(e){
            throw new UnauthorizedException(
                {
                    msg: 'Token inválido',
                    error: e
                }
            )
        }
        
    }

    async login(login: string, password: string){

        const user = await this.usersRepository.findOne({
            where: {
                login: login
            }
        })


        if(user == undefined){
            throw new NotFoundException("Usuário invalido...");
        }
        

        // faz a comparação da string decryptada com a senha passada pelo user no post
        if(await bcrypt.compare(password, user.pass)){
            return {
                "access_token": await this.createToken(user)
            }
        }else{
            throw new NotFoundException("Usuário invalido...");
        }
   
    }
    
    async forget(email:string){

        const find_email = await this.usersRepository.findOne({
            where: {
                email: email
            }
        })

        if(find_email == undefined){
            throw new BadRequestException("Email incorreto!");
        }

        // enviar o email para troca de senha
        await this.mailer.sendMail({
            subject: 'Recuperacao de senha', 
            to: 'rafavfx1@gmail.com',
            template: 'forget',
            context: {
                name: find_email.login,
            }
        });
        
    }

    async register(email: string, login: string, password: string, role: any){
        
        // if(role != undefined){
        //     role = parseInt(role);
        // }

        // let password_hash = await bcrypt.hash(password, await bcrypt.genSalt())

        // const user =  await this.prisma.users_auth.create({
        //     data: {
        //         email: email,
        //         pass: password_hash, 
        //         login: login,
        //         role: role
        //     }
        // });

        // this.createToken(user)
        // return {msg: 'Usuário criado com sucesso!'}
    }

    async show_user(id: number){
        // const user = await this.prisma.users_auth.findFirst({
        //     where: {
        //         id: id
        //     }
        // });

        // return user;
    }
}