import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Testing only
  @Post('/generate-token')
  generateToken(
    @Body() body: { userId: number; username: string; role: string },
  ) {
    const token = this.authService.generateToken(
      body.userId,
      body.username,
      body.role,
    );
    return { token };
  }
}
