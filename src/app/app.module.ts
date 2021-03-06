import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StockComponent } from './components/stock/stock.component';
import { AnagraficaComponent } from './components/anagrafica/anagrafica.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { CategoriesComponent } from './components/anagrafica/categories/categories.component';
import { SubCategoriesComponent } from './components/anagrafica/sub-categories/sub-categories.component';
import { TagsComponent } from './components/anagrafica/tags/tags.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { ArtistsComponent } from './components/anagrafica/artists/artists.component';
import {TokenInterceptor} from './token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    CatalogComponent,
    OrdersComponent,
    StockComponent,
    AnagraficaComponent,
    ReportingComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    TagsComponent,
    ArtistsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FontAwesomeModule,
        FormsModule,
        DataTablesModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
