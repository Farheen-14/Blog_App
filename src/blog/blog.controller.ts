import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/currentUser';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service'; //adding user service here so that we can get current user blog
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService, private readonly userService : UserService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  // @ApiBody({type : CreateBlogDto})
  @ApiCreatedResponse({description : 'User Registration'})
  @ApiUnauthorizedResponse({description : 'Unauthorized..'})
  create(@Body()  createBlogDto: CreateBlogDto, @CurrentUser() user : any) {
    Logger.log("blog controller user", user);
    return this.blogService.create(createBlogDto, user.username);
  }

  

  @Get()
  findAll() {
    return this.blogService.findAll();
  }


  //current user blog

  @Get('/userblog')
    @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  currentUserBlog(@CurrentUser() user: User, id:any) { 
    console.log(user.username);
    
    // Logger.log("blog controller update user", user.username);
    return this.blogService.userBlog(user.username);
  }




  // @Get('/userblog')
  // @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard('jwt'))
  // currentUserBlog(@CurrentUser() user: User) { 
  //   console.log(user);
      
  //   return this.blogService.findLoginUser(user);
  //   }






  @Get('/userblog/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name : "id"
  })
  // @ApiBody({type : CreateBlogDto})
  findOne(@Param('id') id: any, @CurrentUser() user : any) {
    Logger.log("blog controller update user", user.username);
    return this.blogService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiParam({
    name : "id"
  })
  @ApiBody({type : CreateBlogDto})
  update(@Param('id') id: any, @Body() updateBlogDto: UpdateBlogDto, @CurrentUser() user : any) {
    return this.blogService.update(id, updateBlogDto, user.username);
  }



  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name : "id"
  })
  @ApiBody({type : CreateBlogDto})
  remover(@Param('id') id: any, @Body() updateBlogDto: UpdateBlogDto, @CurrentUser() user : any) {
    return this.blogService.remove(id, updateBlogDto, user.username);
  }
  // @Delete('/:id')
  // // @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard('jwt'))
  // remove(@Param('id') id: string, @CurrentUser() user:User) {
  //   return this.blogService.remove(id, user);
  // }
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoiYWYwYzc0ZWYtZjA1ZC00ZTg4LTk2YzItMTdlNjg5ZTNjMmQ2IiwiaWF0IjoxNjU4NDgzMDMwLCJleHAiOjE2NTg4NDMwMzB9.M5qIV97FyJ8-lr-ofJB0wQtNdSrqDBRFkPPw2FNK4ZE

// testing :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJ1c2VySWQiOiI3MzkwY2E0NC02MTUzLTRiNTgtOGFmNy1hOTVkMDViMGZjYzEiLCJpYXQiOjE2NTk5NjEyMTUsImV4cCI6MTY2MDMyMTIxNX0.PAJQeSVqlpld9OHvGXJcYu_SU7DtQsf4mNSVXrCNGic