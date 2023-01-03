import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

import { LoginGuard } from './guards/login.guard';

import { AuthInterceptor } from './services/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/base/header/header.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { ClientsComponent } from './components/home/section/clients/clients.component';
import { AboutComponent } from './components/home/section/about/about.component';
import { CountsComponent } from './components/home/section/counts/counts.component';
import { TabsComponent } from './components/home/section/tabs/tabs.component';
import { ServicesComponent } from './components/home/section/services/services.component';
import { PortfolioComponent } from './components/home/section/portfolio/portfolio.component';
import { TestimonialsComponent } from './components/home/section/testimonials/testimonials.component';
import { PricingComponent } from './components/home/section/pricing/pricing.component';
import { FaqComponent } from './components/home/section/faq/faq.component';
import { TeamComponent } from './components/home/section/team/team.component';
import { ContactComponent } from './components/home/section/contact/contact.component';
import { GraficaComponent } from './components/home/section/grafica/grafica.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
		LoginComponent,
		HeroComponent,
		ClientsComponent,
		AboutComponent,
		CountsComponent,
		TabsComponent,
		ServicesComponent,
		PortfolioComponent,
		TestimonialsComponent,
		PricingComponent,
		FaqComponent,
		TeamComponent,
		ContactComponent,
		GraficaComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SwiperModule,
		ChartsModule
	],
	providers: [
		AuthService,
		StorageService,
		LoginGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
