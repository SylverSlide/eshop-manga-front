import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-sheet',
  templateUrl: './product-sheet.component.html',
  styleUrls: ['./product-sheet.component.scss'],
})
export class ProductSheetComponent implements OnInit {
  faLeft = faArrowAltCircleLeft;
  faRight = faArrowAltCircleRight;
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
  constructor(private fb: FormBuilder, private cartService: CartService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      quantity: [this.quantity],
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
