import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/base/header/header.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { HomeComponent } from './components/home/home/home.component';
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
import { DataService } from './services/data.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
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
		SwiperModule,
		ChartsModule
	],
	providers: [
		DataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
