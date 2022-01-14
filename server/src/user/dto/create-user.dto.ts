import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty()
    passwordConfirmation: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    birthdate: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    imageURL: string;
}
