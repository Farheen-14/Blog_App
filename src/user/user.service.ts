import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){}
  
  async create(createUserDto: Partial<CreateUserDto>) { 
    // console.log(createUserDto.username);
    const user = await this.userRepository.findOne({where:{username:createUserDto.username}})
    // console.log(user);
    if(user){
      throw new NotFoundException('user already exist')
    }
    
    // async create(createUserDto: CreateUserDto)  { 
    // const existingUser = await this.userRepository.findOne({where : {username : createUserDto.username}});
    // console.log("existingUser", existingUser);   
    const password = encodePassword(createUserDto.password)
    const userData = this.userRepository.create({...createUserDto, password})
    const saveUser = await this.userRepository.save(userData)
    return saveUser;  
  }
 

  // async create(createUserDto: Partial<CreateUserDto>) {
  //   console.log(createUserDto);
    
  //   // const getUserInfo = await this.userRepository.findOne({where : {id : id}})
  //   // const userBody = await this.userRepository.findOne({ where: { username : username } });  
  //   // console.log(userBody);
  //   if(userBody.username !== userBody.username ){
  //     const password = encodePassword(createUserDto.password)
  //     const userData = await this.userRepository.create({...createUserDto, password})
  //     const saveUser = await this.userRepository.save(userData)
  //     return saveUser;
  //   }
  //   else{
  //     throw new NotFoundException("Username already exist")
  // }
  // }


  // async create(createUserDto: Partial<CreateUserDto>) { 
  //   // async create(createUserDto: CreateUserDto)  { 
  //   // const existingUser = await this.userRepository.findOne({where : {username : createUserDto.username}});
  //   // console.log("existingUser", existingUser);   
  //   const password = encodePassword(createUserDto.password)
  //   const userData = this.userRepository.create({...createUserDto, password})
  //   const saveUser = await this.userRepository.save(userData)
  //   return saveUser;  
  // }


  async findAll() {
    return this.userRepository.find()
  }

  async findByUserName(username : string){
    return this.userRepository.findOne({where : {username : username}})

  }

  findOne(username : any) {
    return this.userRepository.findOne({where: {username : username}})
  }


  async update( id: any, updateUserDto: Partial<UpdateUserDto>, username: string ) {
    const getUserInfo = await this.userRepository.findOne({where : {id : id}})
    // console.log(getUserInfo,user);
    const userupdate = await this.userRepository.findOne({ where: { username : username } });  
    if(getUserInfo.username !== userupdate.username ){
      throw new NotFoundException("You are not authorized to update the other user info")

    }
    else{
    if (userupdate.id === id) {
      Object.assign(userupdate, updateUserDto);
      return this.userRepository.save(userupdate);  
    } else {
      throw new NotFoundException(
        'Not authorized to update the user',
      );
    }
  }
  }


  async changepasswrd( id: any, updateUserDto: Partial<UpdateUserDto>, username: string ) {
    const getUserInfo = await this.userRepository.findOne({where : {id : id}})
    // console.log(getUserInfo,user);
    const userupdate = await this.userRepository.findOne({ where: { username : username } });  
    if(getUserInfo.username !== userupdate.username ){
      throw new NotFoundException("You are not authorized to update the other user info")

    }
    else{
    if (userupdate.id === id) {
      Object.assign(userupdate, updateUserDto);
      return await this.userRepository.save(userupdate);
      // return `Password Changed & Your password is : ${changepasswrd.password}` 
    } else {
      throw new NotFoundException(
        'Not authorized to update the user',
      );
    }
  }
  }


  async getUserName(username : string) {
    return await this.userRepository.findOne({where: {username: username}})
  }



  // async delete(id: string, user: User) {
  //   const userDelete = await this.userRepository.findOne({ where: { id: id } });
  //   if (userDelete.id === user.id) {
  //     return this.userRepository.remove(userDelete);
  //   } else {
  //     throw new NotFoundException('Not authorized to delete');
  //   }
  // }

  async delete(id: any, updateUserDto: Partial<UpdateUserDto>, username: string) {
    const getUserInfo = await this.userRepository.findOne({where : {id : id}})
    if(!getUserInfo){
      throw new NotFoundException("User Not found")
    }
    // console.log(getUserInfo,user);
    const userData = await this.userRepository.findOne({ where: { username : username } });  
    if(getUserInfo.username !== userData.username ){
      throw new NotFoundException("You are not authorized to update the other user info")

    }
    else{
    if (userData.id === id) {
      Object.assign(userData, updateUserDto);
      const removedInfo = this.userRepository.remove(userData);
      return {
        status : "Data Removed"
      }
    } else {
      throw new NotFoundException(
        'Not authorized to update the user',
      );
    }
  }

  }
}
