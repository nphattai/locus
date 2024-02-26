import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export enum ROLE {
  ADMIN = 'admin',
  NORMAL = 'normal',
  LIMITED = 'limited',
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: number, username: string, role: string) {
    return this.jwtService.sign({ sub: userId, username, role });
  }
}
