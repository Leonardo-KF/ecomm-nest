import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, Product } from '@prisma/client'
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

  async addCart(user: User, productId: string){
    const product = await this.database.product.findUnique({
      where: {id: productId}
    })

    if (!product) {
      throw new NotFoundException("Produto não encontrado");
    }

    const inCart = await this.database.user.findUnique({
      where: {id: user.id},
      include: { products: true }
    })

    inCart.products.map(async (product) => {
      if (product.id === productId) {
        await this.database.user.update({
          where: { id: user.id},
          data: { 
            products: {
              disconnect: {
                id: productId
              }
            }
          }
        })
        return {message: "Produto adcionado ao carrinho"}
      } else {
        await this.database.user.update({
          where: { id: user.id },
          data: {
            products: { 
              connect: { 
                id: productId
              }
            }
          }
        })
      }
      return { message: "Produto removido do carrinho"}
    })

    
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

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
