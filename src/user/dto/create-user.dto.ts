import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {

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
