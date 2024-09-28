import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [
        
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        FileModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {

}