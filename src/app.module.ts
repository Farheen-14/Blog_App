import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entities/blog.entity';
import { AuthModule } from './auth/auth.module';

// console.log(User);

@Module({
  

  // imports: [
  //   ConfigModule.forRoot({
  //     envFilePath : '.env',
  //     isGlobal: true,
  //   }),
  //   TypeOrmModule.forRoot({
  //       type:'mysql',
  //       host: 'localhost',
  //           port: parseInt(process.env.PORT),
  //           username: process.env.USERNAME, 
  //           password: process.env.PASSWORD,
  //           database: process.env.DATABASE,
  //           // autoLoadEntities: true,
  //           entities: [User,Blog],
      
  //           // synchronize: true
  //     }),
  //     UserModule,
  //     BlogModule,
  //     AuthModule,
  // ],
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blogapp',
      entities: [User,Blog],
      synchronize : true,
      // logging : true
    }),
    UserModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
