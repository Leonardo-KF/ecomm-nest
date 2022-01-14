import { Post, Controller, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logindto, Authres } from './dto/login.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from './auth-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from "@nestjs/passport"

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({
    summary: "login with user and token generation"
  })
  login(@Body() data: Logindto): Promise<Authres>{
    return this.authService.Login(data)
  }

  @UseGuards(AuthGuard())
  @Get("profile")
  @ApiOperation({
    summary: "capture user logged in"
  })
  @ApiBearerAuth()
  profile(@AuthUser() user: User) { 
    return user;
  }
}
