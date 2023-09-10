import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-sheet',
  templateUrl: './product-sheet.component.html',
  styleUrls: ['./product-sheet.component.scss'],
})
export class ProductSheetComponent implements OnInit {
  faLeft = faArrowAltCircleLeft;
  faRight = faArrowAltCircleRight;
  product: Product;
  carouselImages: string[] = [];
  slides: any = [
    { id: 'K' },
    { id: 'L' },
    { id: 'M' },
    { id: 'N' },
    { id: 'O' },
  ];
  quantity: number = 1;
  productForm: FormGroup;

  getPrevIndex(index: number): number {
    return (index - 1 + this.slides.length) % this.slides.length;
  }

  getNextIndex(index: number): number {
    return (index + 1) % this.slides.length;
  }
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.fb.group({
      quantity: [this.quantity],
    });
  }

  getProduct() {
    this.route.params.subscribe((params) => {
      const productId = +params['id']; // Récupère l'identifiant du produit depuis l'URL
      this.productService.getProduct(productId).subscribe(
        (product: any) => {
          const updatedProduct = new Product();
          updatedProduct.id = product.id;
          updatedProduct.name = product.name;
          updatedProduct.description = product.description;
          updatedProduct.price = product.price;
          updatedProduct.stockQuantity = product.stock_quantity;
          updatedProduct.coverImage = product.image_path;
          updatedProduct.category = product.category;

          if (product.stock_quantity!! <= 0) {
            updatedProduct.isAvailableInStock = false;
          }
          this.product = product;
          this.carouselImages.push(updatedProduct.coverImage);
          if (product.images.length > 0) {
            product.images.forEach((image: any) => {
              this.carouselImages.push(image.path);
            });
          }
          console.log(product);
        },
        (error) => {
          console.error("Une erreur s'est produite : ", error);
        }
      );
    });
  }

  addToCart() {
    this.cartService.addItemToCart();
  }

  increment() {
    this.productForm.patchValue({
      quantity: this.productForm.value.quantity + 1,
    });
  }

  decrement() {
    if (this.productForm.value.quantity > 1) {
      this.productForm.patchValue({
        quantity: this.productForm.value.quantity - 1,
      });
    }
  }
}
