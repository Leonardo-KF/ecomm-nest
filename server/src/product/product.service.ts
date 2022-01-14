import { ConflictException, Injectable } from '@nestjs/common';
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

  async findAll() {
    return `This action returns all product`;
  }

  async findOne(id:string): Promise<Product> {
    const product = await this.prismaService.product.findFirst({where: {id}});

    if (!product) { 
      throw new ConflictException("Produto não encontrado")
    }
    return product;
  }

  
  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.prismaService.product.findFirst({where: {id}});
    
    return `This action removes a #${id} product`;
  } 
}
