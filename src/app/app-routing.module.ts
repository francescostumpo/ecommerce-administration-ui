import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {OrdersComponent} from './components/orders/orders.component';
import {StockComponent} from './components/stock/stock.component';
import {AnagraficaComponent} from './components/anagrafica/anagrafica.component';
import {ReportingComponent} from './components/reporting/reporting.component';
import {CategoriesComponent} from './components/anagrafica/categories/categories.component';
import {SubCategoriesComponent} from './components/anagrafica/sub-categories/sub-categories.component';
import {TagsComponent} from './components/anagrafica/tags/tags.component';

const routes: Routes = [
  {path: '', redirectTo: 'aragonMultiservice', pathMatch: 'full'},
  {path: 'aragonMultiservice', component: LoginComponent, pathMatch: 'full'}, // TO-DO LoginComponent
  {path: 'aragonMultiservice/homepage', component: HomepageComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/catalog', component: CatalogComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/orders', component: OrdersComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/stock', component: StockComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/anagrafica', component: AnagraficaComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/anagrafica/categories', component: CategoriesComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/anagrafica/subCategories', component: SubCategoriesComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/anagrafica/tags', component: TagsComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/reporting', component: ReportingComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
