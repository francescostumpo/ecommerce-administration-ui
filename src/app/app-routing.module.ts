import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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
import {ArtistsComponent} from './components/anagrafica/artists/artists.component';
import {AuthGuardService} from './services/auth-guard.service';
import {DiscountCodesComponent} from './components/anagrafica/discount-codes/discount-codes.component';

const routes: Routes = [
  {path: '', redirectTo: 'aragonMultiservice', pathMatch: 'full'},
  {
    path: 'aragonMultiservice',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }, // TO-DO LoginComponent
  {
    path: 'aragonMultiservice/homepage',
    component: HomepageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore', 'Reporter']}
  },
  {
    path: 'aragonMultiservice/catalog',
    component: CatalogComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/orders',
    component: OrdersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/stock',
    component: StockComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica',
    component: AnagraficaComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica/categories',
    component: CategoriesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica/subCategories',
    component: SubCategoriesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica/artists',
    component: ArtistsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica/tags',
    component: TagsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/anagrafica/discountCodes',
    component: DiscountCodesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore']}
  },
  {
    path: 'aragonMultiservice/reporting',
    component: ReportingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {expectedRoles: ['Amministratore', 'Reporter']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
