import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MaterialModule } from './material/material.module';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSheetComponent } from './product-sheet/product-sheet.component';
import { InscriptionModalComponent } from './inscription-modal/inscription-modal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.modules';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { CoreUIlModule } from './admin/coreui/coreui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginModalComponent,
    HeaderMobileComponent,
    ProductComponent,
    ProductSheetComponent,
    InscriptionModalComponent,
    VerifyMailComponent,
    AdminComponent,
    HeaderAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    AdminRoutingModule,
    CoreUIlModule,
    NgbModule,
    NgxPayPalModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
