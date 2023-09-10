import { Category } from './category.model';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  coverImage: string;
  otherImages: string[];
  category: Category;
  isAvailableInStock?: boolean = true;
}
