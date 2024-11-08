import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  MessageBuilder,
  ResponseBuilder,
  ResponseMethod,
} from 'src/app/common/utils/response.util';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/app/decorators/roles.decorator';
import { UserRole } from 'src/app/types/user';
import { Public } from 'src/app/decorators/public.decorator';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UserValidateEntity } from 'src/users/entities/userValidate.dto';

@Controller('auth')
export class AuthController {
  private readonly messageBuilder = new MessageBuilder('User');
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Roles(UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return ResponseBuilder(
      HttpStatus.CREATED,
      this.messageBuilder.build(ResponseMethod.create),
      new UserEntity(user),
    );
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return ResponseBuilder(HttpStatus.OK, 'OK', {
      token,
    });
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('validate')
  async validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    const extractToken = this.authService.validateToken(validateTokenDto.token);
    if (!extractToken) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.usersService.findById(extractToken.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return ResponseBuilder(
      HttpStatus.OK,
      this.messageBuilder.build(ResponseMethod.findOne, { id: extractToken.id }),
      new UserValidateEntity(user),
    );
  }
}


