import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository : Repository<UserEntity>
    ) {}
    
    async create({name,  email, dob, cep, cnpj}: CreateUserDTO) {
            // return await this.prisma.users.create({
            //     data: {
            //         email: email,
            //         name: name,
            //         birthdate: new Date(dob), // passando um campo de Date valido para o SQL
            //         cep: cep, 
            //         cnpj: cnpj ? cnpj : null
            //     }
            // });
    }

    async read_all_users() {
        // return await this.prisma.users.findMany();
    }

    async read_user({email}: CreateUserDTO){
        // return await this.prisma.users.findFirst({
        //     where: {email: email}
        // })
    }

    async update_user({name,  email, dob, cep, cnpj} : CreateUserDTO, id: number) {

        await this.isset(id);

        // return await this.prisma.users.update({
        //     data: {
        //         name: name,
        //         email: email,
        //         birthdate: new Date(dob),
        //         cep: cep, 
        //         cnpj: cnpj ? cnpj : null
        //     }, 
        //     where: {
        //         id: id
        //     }
        // })
    }
    
    async patch_user(params : UpdatePatchUserDTO, id: number) {
        
        await this.isset(id);

        // return await this.prisma.users.update({
        //     data: params, 
        //     where: {
        //         id: id
        //     }
        // })
    }

    async delete_user(id: number){
        
        // await this.isset(id);

        // return await this.prisma.users.delete({
        //     where: {
        //         id: id
        //     }
        // })
            
    }

    async find_user_by_id(id: number){
        // return await this.prisma.users.findFirst({
        //     where: {
        //         id: id
        //     }
        // })
    }

    async isset(id : number){
        if(await this.find_user_by_id(id) === null){
            throw new NotFoundException('Registro não existe!')    
        }
    }
}