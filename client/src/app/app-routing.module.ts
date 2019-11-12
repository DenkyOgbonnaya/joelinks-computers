import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about/about-page.component';
import { ServicePageComponent } from './service/service-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'services', component: ServicePageComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
