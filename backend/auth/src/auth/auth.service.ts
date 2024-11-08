import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { password } = loginDto;
    const user = await this.usersService.findByUsername(loginDto.username);

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();
    return {
      token,
      refreshToken,
    };
  }

  validateToken(token: string): { id: string; role: string } | null {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      return { id: payload.id, role: payload.role };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
