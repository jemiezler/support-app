// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private authUrl = process.env.AUTH_BACKEND_URL || 'http://localhost:8080/api/auth/validate';

  constructor(private readonly httpService: HttpService) {}

  async validateToken(token: string): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.post(this.authUrl, { token }));
      return response.data; // Assuming it returns user data
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
