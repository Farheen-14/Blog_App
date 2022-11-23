import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateBlogDto {

    @IsString()
    @ApiProperty()
    @IsOptional()
    title : string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description : string;

    @ApiProperty()
    @IsOptional()
    created_on : Date;

    @ApiProperty()
    @IsOptional()
    modify_on : Date;

    @ApiProperty()
    @IsOptional()
    key : [];

    @ApiProperty()
    @IsOptional()
    url : []; 
    
    user : User   
}
