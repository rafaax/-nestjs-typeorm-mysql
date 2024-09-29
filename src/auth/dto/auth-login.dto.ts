import { IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
