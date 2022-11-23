import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "src/blog/entities/blog.entity";


// export enum TaskStatus {
//     Created = 0,
//     InProgress = 1,
//     Done = 2,

// }

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @ApiProperty({type:String, description : 'name of user'} )
    @Column()
    username : string;

    @ApiProperty({type:Number, description : 'mobile of user'} )
    @Column()
    mobile : string;

    @ApiProperty({type:String, description : 'email of user'} )
    @Column()
    email : string;

    @ApiProperty({type:String, description : 'password of user'} )
    @Column()
    password : string;

    @ApiProperty({type:String, description : 'age of user'} )
    @Column()
    country : string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(type => Blog, blog => blog.user)
    blogs: Blog[];
}
