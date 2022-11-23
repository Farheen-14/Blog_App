import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
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
}
