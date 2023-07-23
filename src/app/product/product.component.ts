import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  @Input() productName: string;
  @Input() productImageUrl: string;
  @Input() productPrice: number;
  @Input() isAvailableInStock: boolean;
  productForm: FormGroup;
  quantity: number = 1;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.productForm = this.fb.group({
      quantity: [this.quantity],
    });
    if (param!!) {
      this.id = +param;
    }
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
