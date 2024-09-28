import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]), 
    UserModule, AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cathrine39@ethereal.email',
            pass: 'S8Kwn9xZ8hj2gzs5Y6'
        }
      },
      defaults: {
        from: 'nest-modules" <modules@nestjs.com>'
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '',
      port: 3306, 
      username: 'root',
      password: '',
      database: '',
      entities: [],
      synchronize: true
    })
  ],

  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  exports: [AppService]
})

export class AppModule {}