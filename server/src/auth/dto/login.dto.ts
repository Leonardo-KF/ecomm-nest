import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty} from "class-validator"


export class Logindto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}

export class Authres {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    token: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    user: User;
}