import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors, UseGuards} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdatePatchUserDTO } from "./dto/update-patch.dto"
import { UserService } from "./user.service"
import { ParamId } from "src/decorators/param-id.decorator"
import { SkipThrottle, ThrottlerGuard } from "@nestjs/throttler"

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){ }

    @Post()
    async create_user(@Body() body: CreateUserDTO){
        return this.userService.create(body)
    }

    @Get()
    async get_users_list(){
        return this.userService.read_all_users();
    }

    @Get(':email') 
    async get_user(@Param() params){
        return this.userService.read_user(params)
    }

    @Put(':id')
    async update_user(@Body() body: CreateUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update_user(body, id)
    }

    @Patch(':id')
    async update_ignore_user(@Body() body: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number ){
        return this.userService.patch_user(body, id);
    }

    @Delete(':id')
    async delete(@ParamId() id: number){
        console.log(id)
        return this.userService.delete_user(id)
    }
} 