import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule} from "@angular/forms"

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
    SignupComponent
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
    HeaderModule
  ],
  providers: [ProductService, CartStoreService, CartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
