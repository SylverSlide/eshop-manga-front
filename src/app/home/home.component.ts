import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      data.map((product: any) => {
        const updatedProduct = new Product();
        updatedProduct.id = product.id;
        updatedProduct.name = product.name;
        updatedProduct.description = product.description;
        updatedProduct.price = product.price;
        updatedProduct.stockQuantity = product.stock_quantity;
        updatedProduct.coverImage = product.image_path;
        updatedProduct.categoryId = product.categoryId;

        if (product.stock_quantity!! <= 0) {
          updatedProduct.isAvailableInStock = false;
        }

        this.products.push(updatedProduct);
      });
    });
  }
}
