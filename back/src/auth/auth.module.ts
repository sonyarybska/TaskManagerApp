import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { AuthMiddleware } from './auth.middleware';
import { AuthHelper } from '../helpers/AuthHelper';

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, JwtService, AuthHelper],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
