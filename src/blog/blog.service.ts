import { Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { CurrentUser } from 'src/currentUser';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private readonly blogRepository : Repository<Blog>,
  private readonly userService : UserService,
  // private readonly userRepository : Repository<User>
  ){}

  //create & post
  async create(createBlogDto: CreateBlogDto, user : string ) {
    const blog = await this.blogRepository.create(createBlogDto)
    const userInfo = await this.userService.findByUserName(user)   
    blog.user= userInfo; 
    return this.blogRepository.save(blog)
  }

  //current user blog
  async userBlog(user) {    
    const userInfo = await this.userService.findByUserName(user)    
    const getUserId = userInfo.id    
    const blogupdate = await this.blogRepository.find({
      where:{
        user:{
          id: getUserId
        },
      },
      relations:{
        user: true
      }
    })    
    if(blogupdate.length === 0){
      throw new NotFoundException('No data available for this user')
    }
    return blogupdate
    
  }

  //findone
  findOne(id : string) {
    return this.blogRepository.findOne({where: {id: id}})
  }


  findAll() {
    return this.blogRepository.find();
  }



  //update blog only signin user
  // async update(id: any, updateBlogDto: Partial<UpdateBlogDto>, user :string ) { 
  //   const blogupdate = await this.blogRepository.findOne({ where: { id: id } });
  //   const userInfo = await this.userService.findByUserName(user)
  //   if (blogupdate.user.id === userInfo.id) {     
  //     Object.assign(blogupdate, updateBlogDto);
  //     return this.blogRepository.save(blogupdate);
  //   } else {
  //     throw new NotFoundException('You Are Not Authorized');
  //   }
  // } 

  async update(id: any, updateBlogDto: Partial<UpdateBlogDto>, user :string ) { 
    const blogupdate = await this.blogRepository.findOne({ where: { id: id } });
    const userInfo = await this.userService.findByUserName(user)
    if (blogupdate.user.id === userInfo.id) {     
      Object.assign(blogupdate, updateBlogDto);
      return this.blogRepository.save(blogupdate);
    } else {
      throw new NotFoundException('You Are Not Authorized');
    }
  } 

  async remove(id: any, updateBlogDto: Partial<UpdateBlogDto>, user :string ) { 
    //if no blog then what will work
    const blogupdate = await this.blogRepository.findOne({ where: { id: id } });
    const userInfo = await this.userService.findByUserName(user)
    if (blogupdate.user.id === userInfo.id) {     
      Object.assign(blogupdate, updateBlogDto);
      return this.blogRepository.remove(blogupdate);
    } else {
      throw new NotFoundException('Not Authorized');
    }
  } 

  async getLoginUser(username : string) {
    console.log("username", username);

    // const getUserInfo = await this.userRepository.findOne({where : {username : username}})

    return username
    // return await this.blogRepository.findOne({where : {user.username : username}})
  }


  
  // async getUserName(username : string) {
  //   return await this.userRepository.findOne({where: {username: username}})
  // }

  // async remove(id: string, user: User) {
  //   const blogdelete = await this.blogRepository.findOne({ where: { id: id } });
  //   if (blogdelete.user.id === user.id) {
  //     return this.blogRepository.remove(blogdelete);
  //   } else {
  //     throw new NotFoundException('user not found');
  //   }
  // }




}
