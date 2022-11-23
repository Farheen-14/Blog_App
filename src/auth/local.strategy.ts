import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { NotFoundError } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { matchPassword } from 'src/utils/bcrypt';
import { AuthService } from './auth.service';

@Injectable() //using this decorator so that we can add into our providers
// export class LocalStrategy extends PassportStrategy(Strategy) {
  export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  // async validate(username: string, password: string, id: any) {   
    async validate(username: string, password: string, id: any) {   
    const user = await this.userService.getUserName(username);
    if(user == undefined){
      throw new UnauthorizedException("Unauthorized getting undefined")
    }

    if (user) {
      const matched = matchPassword(password, user.password);
      if (matched) {
        console.log('Succcess');
        return user;
      } else {
        throw new NotFoundException('Incorrect Password');
        // return null;
      }
    }
    throw new NotFoundException('Validation Error');
    // return null;
  }
}

// async validate(username : string, password : string, id : any) {    //username is inbuild
//     console.log("inside validator");

//     const user : User = await  this.userService.getUserName(username);
//     if(user === undefined) throw new UnauthorizedException(); //if user is undefined throw error
//     if(user !== undefined && user.password == password){

//         //if user not undefined and password is matched then return user otherwise throw error.
//         return user;
//     }
//     else{
//         throw new UnauthorizedException()
// }

function comparePassword() {
  throw new Error('Function not implemented.');
}
