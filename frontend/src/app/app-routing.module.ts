import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CookiesComponent } from './cookies/cookies.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'cart', component: ShopCartComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', 
        component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
