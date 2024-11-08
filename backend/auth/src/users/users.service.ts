import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserStatus, UserRole } from 'src/app/types/user';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.STUDENT,
    });

    return (await user.save()).toObject();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException(`User with studentId ${username} not found`);
    }
    return user;
  }

  async findById(id: ObjectId | string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user){
      throw new NotFoundException(`User with Id ${id} not found`)
    }
    return user.toObject();
  }
}
