import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}


  async create(data: CreateUserDto) : Promise<User> {
    const verificationEmail = await this.database.user.findUnique({
      where: { email: data.email },
    })
    if (verificationEmail) {
      throw new ConflictException("email ja cadastrado")
    } 

    // validações

    if (data.password !== data.passwordConfirmation) {
      throw new ConflictException("As senhas são diferentes")
    } else {
     delete data.passwordConfirmation
    }
    const encrypt = await bcrypt.hash(data.password, 10)
    const user = await this.database.user.create({
      data: { 
        ...data, 
        password: encrypt,

      }
    })
    delete user.password;
    
    return user;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
