import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {OrdersComponent} from './components/orders/orders.component';
import {StockComponent} from './components/stock/stock.component';
import {AnagraficaComponent} from './components/anagrafica/anagrafica.component';
import {ReportingComponent} from './components/reporting/reporting.component';

const routes: Routes = [
  {path: '', redirectTo: 'aragonMultiservice', pathMatch: 'full'},
  {path: 'aragonMultiservice', component: LoginComponent, pathMatch: 'full'}, // TO-DO LoginComponent
  {path: 'aragonMultiservice/homepage', component: HomepageComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/catalog', component: CatalogComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/orders', component: OrdersComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/stock', component: StockComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/anagrafica', component: AnagraficaComponent, pathMatch: 'full'},
  {path: 'aragonMultiservice/reporting', component: ReportingComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
