import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  extends PartialType(CreateUserDto) {

    @IsString()
    @ApiProperty()
    @IsOptional()
    username : string;

    @IsMobilePhone()
    @ApiProperty()
    @IsOptional()
    mobile : string;

    @IsEmail()
    @ApiProperty()
    @IsOptional()
    email : string;

    @IsNotEmpty()
    @ApiProperty()
    @IsOptional()
    password : string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    country : string;

    @IsOptional()
    isActive : boolean;
}
    