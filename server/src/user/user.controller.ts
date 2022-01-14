import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Product } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth} from "@nestjs/swagger"
import {AuthGuard} from "@nestjs/passport";
import { AuthUser } from "../auth/auth-user.decorator"

ApiTags("users")
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

  @UseGuards(AuthGuard())
  @Get("cart")
  @ApiOperation({
    summary: "items in cart"
  })
  @ApiBearerAuth()
  cart(@AuthUser() user: User ) {
    return this.userService.cart(user);
  }

  @UseGuards(AuthGuard())
  @Patch('update')
  @ApiOperation({
    summary: "update user infos"
  })
  @ApiBearerAuth()
  update(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }

  @UseGuards(AuthGuard())
  @Delete('delete')
  @ApiOperation({
    summary: "delete user"
  })
  @ApiBearerAuth()
  remove(@AuthUser() user: User) {
    return this.userService.remove(user);
  }
}
