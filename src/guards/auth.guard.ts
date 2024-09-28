import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext) {
        
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization;

        if(token == undefined){
            throw new UnauthorizedException('Missing token');
        }
        
        var jwtToken = token.split(' ')[1];

        try {
            const token_data = this.authService.checkToken(jwtToken);
            
            const user_data =   await this.authService.show_user(token_data.sub)

            request.token_data = token_data;
            request.user_data = user_data;

            return true
        }catch(e){
            return false;
        }
    }
}