import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/currentUser';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiBody({type : CreateUserDto})
  @ApiCreatedResponse({description : 'User Registration'})
  @ApiUnauthorizedResponse({description : 'Unauthorized..'})
  create(@Body() createUserDto: CreateUserDto, user : User) {
    // console.log(createUserDto);
    
    return this.userService.create(createUserDto);
  }

  
  // @Get('/userblog')
  //   @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard('jwt'))
  // currentUserBlog(@CurrentUser() user: User) { 
  //   console.log(user.username);
    
  //   // Logger.log("blog controller update user", user.username);
  //   return this.blogService.getLoginUser(user.username);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name : "id"
  })
  // @ApiBody({type : CreateUserDto})
  findOne(@Param('id') id:any){
      return this.userService.findOne(id)
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiParam({
    name : "id"
  })
  @ApiBody({type : CreateUserDto})
  update(@Param('id') id: any,  @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: any) {   
  return this.userService.update(id, updateUserDto, user.username);  
  }

//changepassword
  @Patch('/changepassword/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiParam({
    name : "id"
  })
  @ApiBody({type : CreateUserDto})
  changepassword(@Param('id') id: any,  @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: any) {   
  return this.userService.changepasswrd(id, updateUserDto, user.username);  
  }

  

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiParam({
    name : "id"
  })
  @ApiBody({type : CreateUserDto})
  remove(@Param('id') id: any,  @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: any) {   
    return this.userService.delete(id, updateUserDto, user.username);  
    }

}
 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VySWQiOiI0OGQ4NWZjMi0zMzk5LTQ1YzAtOTc1OC0xZWIxM2MyMjI1ZTgiLCJpYXQiOjE2NTU3MzIwODEsImV4cCI6MTY1NjA5MjA4MX0.Z-sICAd7Flefd4N7VjTMhgEl_hEnN_MsTI1oHn02DxU