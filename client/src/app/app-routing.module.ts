import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'user/order', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'user/profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},

  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard]},
  {path: 'admin/product/new', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'admin/product/edit/:id', component: EditProductComponent,canActivate: [AdminGuard]},
  {path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminGuard]},
  {path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},

  {path: 'services', component: ServicePageComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'user/order/:id', component: OrdersDetailsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: false,
    anchorScrolling: "enabled",
    scrollPositionRestoration:"enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
