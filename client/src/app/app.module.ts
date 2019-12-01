import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from "./about/about.component";
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { ClientsComponent } from './clients/clients.component';
import { AboutPageComponent } from './about/about-page.component';
import { ServicePageComponent } from './service/service-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './about/faq.components';
import { ProductService } from './products/shared/products.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartStoreService } from './shared/cart-store.service';
import { FooterComponent } from './footer/footer.component';
import { CartService } from './shared/cart-service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './shared/auth.service';
import { ProductsModule } from './products';
import { HeaderModule } from './header/header.module';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { OrdersModule } from './orders/orders.module';
import { JwtInterceptor, ProductsStoreService, ErrorInterceptor } from './shared';
import { OrderService } from './orders/shared/orders.service';
import { AdminModule } from './admin/admin.module';
import { PaginationModule } from './pagination/pagination.module';
import { CategoriesModule } from './admin/admin-categories/categories.module';
import { CategoriesStoreService } from './shared/categories-store.service';
import { CategoryService } from './admin/admin-categories/shared/categories.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    TeamComponent,
    ClientsComponent,
    AboutPageComponent,
    ServicePageComponent,
    ContactUsComponent,
    FaqComponent,
    ShoppingCartComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    HeaderModule,
    NgbModule,
    OrdersModule,
    AdminModule,
    PaginationModule,
    CategoriesModule
  ],
  providers: [
    ProductService, 
    CartStoreService, 
    CartService, 
    AuthService,
    OrderService,
    ProductsStoreService,
    CategoriesStoreService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [CheckoutComponent]
})
export class AppModule { }
