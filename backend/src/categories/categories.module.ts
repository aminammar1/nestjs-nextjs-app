import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import {
  SubCategory,
  SubCategorySchema,
} from 'src/subcategories/schemas/subcategories.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: SubCategory.name,
        schema: SubCategorySchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
