import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  coverImage: File;
  otherImages: File[] = [];
  categories: Category[] = [];
  category: Category;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  onCoverImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.coverImage = input.files[0];
    }
  }

  onOtherImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.otherImages = Array.from(input.files);
    }
  }

  onFileUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      this.product.coverImage = filePath;
      console.log('Chemin du fichier uploadé : ', filePath);
    }
  }
  onSubmit() {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        // Le produit a été créé avec succès.
        console.log('Produit créé avec succès :', response);
        // Réinitialiser le formulaire
        this.product = {
          id: 0,
          name: '',
          description: '',
          price: 0,
          stockQuantity: 0,
          coverImage: '',
          otherImages: [],
          category: this.category,
        };
        this.product.coverImage = '';
        this.product.otherImages = [];
      },
      (error) => {
        console.error('Erreur lors de la création du produit :', error);
      }
    );
  }
}
