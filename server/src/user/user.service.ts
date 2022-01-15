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

    let foundproduct = false;

    inCart.products.map((product) => {
      if (product.id === productId) {
        foundproduct = true;
      } 
    })

    if (!foundproduct) {
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
      return "produto adicionado do carrinho";
    } else {
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
      return "Produto removido do carrinho";
    }
    
  }

  async cart(user: User) {
    return await this.database.user.findUnique({
      where: {id: user.id},
      include: { products: true}
    })
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const updateU = await this.database.user.update({
      data: updateUserDto,
      where: {id: user.id},
    })

    delete updateU.password

    return updateU;
  }

  async remove(user: User): Promise<{message: string}> {
    const conta = await this.database.user.findUnique({where: {id: user.id}})

    if (!conta) {
      throw new NotFoundException("Usuario não encontrado")
    } else {
      await this.database.user.delete({
        where: { id: user.id }
      })
    }

    return { message: "Usuario deletado"};
  }
}
