import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageOrderProductsComponent } from './manage-order-products/manage-order-products.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      { path: 'manage-product', component: ManageProductComponent },
      { path: 'manage-categories', component: ManageProductComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      {
        path: 'manage-order-products',
        component: ManageOrderProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
