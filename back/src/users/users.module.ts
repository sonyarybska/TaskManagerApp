import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UsersMiddleware } from './users.middleware';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
