import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {};


  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.prismaService.product.create({
      data,

    })
    return product;
  }

  async findAll(): Promise<Product[]>{
    const products = await this.prismaService.product.findMany();
    return products;
  }

  async findOne(id:string): Promise<Product> {
    const product = await this.prismaService.product.findFirst({where: {id}});

    if (!product) { 
      throw new ConflictException("Produto não encontrado")
    }
    return product;
  }

  
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.prismaService.product.update({
      data: updateProductDto,
      where: {id}
    })
    return product;
  }

  async remove(id: string): Promise<{message: string}> {
    const product = await this.prismaService.product.findFirst({where: {id}});
    
    if (!product) {
      throw new NotFoundException("Produto não encontrado")
    } else {
      await this.prismaService.product.delete({where: {id}})
    }

    return { message: "Produto deletado com sucesso"};
  } 
}
