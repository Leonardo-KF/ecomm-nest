import { Post, Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logindto, Authres } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
}
