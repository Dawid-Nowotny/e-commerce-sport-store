import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CookiesComponent } from './cookies/cookies.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddProductComponent } from './add-product/add-product.component';
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'cart', component: ShopCartComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'login-google', component: LoginGoogleComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'admin-panel/add-product', component: AddProductComponent },
  { path: '**', pathMatch: 'full', 
        component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
