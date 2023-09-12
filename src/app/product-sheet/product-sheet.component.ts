import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';

@Component({
  selector: 'app-product-sheet',
  templateUrl: './product-sheet.component.html',
  styleUrls: [
    '../../../node_modules/keen-slider/keen-slider.min.css',
    './product-sheet.component.scss',
  ],
})
export class ProductSheetComponent implements OnInit {
  faLeft = faArrowAltCircleLeft;
  faRight = faArrowAltCircleRight;
  product: Product;
  carouselImages: any = [];
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;
  @ViewChild('thumbnailRef') thumbnailRef: ElementRef<HTMLElement>;
  slider: KeenSliderInstance;
  thumbnailSlider: KeenSliderInstance;

  quantity: number = 1;
  productForm: FormGroup;
  dataLoaded: boolean = false;
  loading = true;
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.fb.group({
      quantity: [this.quantity],
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
    if (this.thumbnailSlider) this.thumbnailSlider.destroy();
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
          this.carouselImages.push({ id: 1, path: updatedProduct.coverImage });
          if (product.images.length > 0) {
            let index = 2;
            product.images.forEach((image: any) => {
              this.carouselImages.push({ id: index++, path: image.path });
            });
          }
          this.cdr.detectChanges();
          this.initializeSliders();
          this.dataLoaded = true;
        },
        (error) => {
          console.error("Une erreur s'est produite : ", error);
        }
      );
    });
  }

  initializeSliders() {
    if (this.slider) {
      this.slider.destroy();
    }
    if (this.thumbnailSlider) {
      this.thumbnailSlider.destroy();
    }

    this.slider = new KeenSlider(this.sliderRef.nativeElement);
    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        loop: true,
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
      [this.ThumbnailPlugin(this.slider)]
    );
  }

  addToCart(product: Product) {
    this.cartService.addItemToCart(product);
  }

  increment() {
    this.productForm.patchValue({
      quantity: this.productForm.value.quantity + 1,
    });
  }

  ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
    return (slider) => {
      function removeActive() {
        slider.slides.forEach((slide) => {
          slide.classList.remove('active');
        });
      }
      function addActive(idx: number) {
        slider.slides[idx].classList.add('active');
      }

      function addClickEvents() {
        slider.slides.forEach((slide, idx) => {
          slide.addEventListener('click', () => {
            main.moveToIdx(idx);
          });
        });
      }

      slider.on('created', () => {
        addActive(slider.track.details.rel);
        addClickEvents();
        main.on('animationStarted', (main) => {
          removeActive();
          const next = main.animator.targetIdx || 0;
          addActive(main.track.absToRel(next));
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
        });
      });
    };
  }

  decrement() {
    if (this.productForm.value.quantity > 1) {
      this.productForm.patchValue({
        quantity: this.productForm.value.quantity - 1,
      });
    }
  }
}
