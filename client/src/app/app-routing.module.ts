import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about/about-page.component';
import { ServicePageComponent } from './service/service-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsComponent, ProductDetailsComponent } from './products';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './admin/products/admin-products.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { EditProductComponent } from './admin/products/edit-product/edit-product.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'user/order', component: OrdersComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/product/new', component: AddProductComponent},
  {path: 'admin/product/edit/:id', component: EditProductComponent},
  {path: 'admin/categories', component: AdminCategoriesComponent},
  {path: 'services', component: ServicePageComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'user/order/:id', component: OrdersDetailsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
