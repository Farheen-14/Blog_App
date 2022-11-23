import { Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './currentUser';
import { User } from './user/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService : AuthService, private readonly userService : UserService) {}

  @Post('/login')
  @ApiBody({type : CreateUserDto})
  // @ApiParam({
  //   name : "username"
    
  // })
  @ApiCreatedResponse({description : 'Success'})
  @ApiUnauthorizedResponse({description : 'Unauthorized'})
  @UseGuards(AuthGuard('local'))
  login(@Request() req:any) {
    return this.authService.generateToken(req.user)
  }

  @Get('/whoami')
  // @ApiBody({type : CreateUserDto})
  @ApiBearerAuth('access-token')
  // @ApiCreatedResponse({description : 'Success'})
  // @ApiUnauthorizedResponse({description : 'Not a Current User'})
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  getHello(@Request() req: any, @CurrentUser() user: User) {   
    // console.log("current user from app controller", user);
    return this.userService.findOne(user.username)
    // return this.userService.findOne(user.id)
  }

  

  //current user blog 
  //get current user blog only 
  // @Get()
  // currentUserBlog(username : any){
  //   return this.userService.findOne(username)
  // }



}
