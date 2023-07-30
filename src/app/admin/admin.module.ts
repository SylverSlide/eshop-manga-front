import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.modules';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageOrderProductsComponent } from './manage-order-products/manage-order-products.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ManageProductComponent,
    ManageCategoriesComponent,
    ManageUsersComponent,
    ManageOrdersComponent,
    ManageOrderProductsComponent,
    FileUploadComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    NgxDropzoneModule,
  ],
})
export class AdminModule {}
