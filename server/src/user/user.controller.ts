import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Product } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth} from "@nestjs/swagger"
import {AuthGuard} from "@nestjs/passport";
import { AuthUser } from "../auth/auth-user.decorator"

ApiTags("user")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register user"
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Patch("addcart/:id")
  @ApiOperation({
    summary: "add/remove to cart"
  })
  @ApiBearerAuth()
  addCart(@AuthUser() user: User, @Param("id") productId: string ) {
    return this.userService.addCart(user, productId);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
