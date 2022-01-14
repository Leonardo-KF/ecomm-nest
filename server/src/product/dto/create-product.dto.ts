import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    imageURL: string;
}
