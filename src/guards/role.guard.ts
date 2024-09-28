import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext) {
        
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);
        
        
        const request = context.switchToHttp().getRequest();
        const user_data = request.user_data;
        
        console.log(requiredRoles)

        const rolesFiltered = requiredRoles.filter(role => role == user_data.role);


        if(rolesFiltered.length > 0 ){
            return true;
        }else{
            return false;
        }
    }
}