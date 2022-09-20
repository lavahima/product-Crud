import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-servies/auth-guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProductModule } from './products/product.module';

const productModule = () => import('./products/product.module').then(x => x.ProductModule);
const appRoutes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'products', loadChildren: productModule, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
