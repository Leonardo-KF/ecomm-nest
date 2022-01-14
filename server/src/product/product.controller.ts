import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags} from "@nestjs/swagger"

@ApiTags("game")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @ApiOperation({
    summary: "Register a new product"
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

 @Patch('find/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  
}
