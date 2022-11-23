import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @ApiProperty({type:String, description : 'title of blog'} )
    @Column()
    title : string;

    @ApiProperty({type:String, description : 'blog description'} )
    @Column()
    description : string;

    @ApiProperty({type:Date, description : 'created_on of blog'} )
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_on: Date;

    @ApiProperty({type:Date, description : 'modify_on of blog'} )
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    modify_on: Date;

    @ApiProperty({type:String, description : 'blog keys'} )
    @Column('simple-array')
    key : [];

    @ApiProperty({type:String, description : 'blog url'} )
    @Column('simple-array')
    url : [];

    @ManyToOne(() => User, user => user.blogs ,{cascade:true, eager : true})
    // @JoinColumn('User')
    user: User;

}
