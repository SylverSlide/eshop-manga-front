import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageOrderProductsComponent } from './manage-order-products/manage-order-products.component';

@NgModule({
  declarations: [
    ManageProductComponent,
    ManageCategoriesComponent,
    ManageUsersComponent,
    ManageOrdersComponent,
    ManageOrderProductsComponent,
  ],
  imports: [CommonModule],
})
export class AdminModule {}
