import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from "./about/about.component";
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { ClientsComponent } from './clients/clients.component';
import { AboutPageComponent } from './about/about-page.component';
import { SubHeader } from './header/subheader.component';
import { ServicePageComponent } from './service/service-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './about/faq.components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    TeamComponent,
    ClientsComponent,
    AboutPageComponent,
    SubHeader,
    ServicePageComponent,
    ContactUsComponent,
    FaqComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
