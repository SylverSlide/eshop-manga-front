import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { ProductSheetComponent } from './product-sheet/product-sheet.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductSheetComponent },
  { path: 'header-mobile', component: HeaderMobileComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
