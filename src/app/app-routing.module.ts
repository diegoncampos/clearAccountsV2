import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { LoginGuard } from './guards/login.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard]},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'new-group', loadChildren: './pages/new-group/new-group.module#NewGroupPageModule' },
  { path: 'purchases', loadChildren: './pages/purchases/purchases.module#PurchasesPageModule' },
  { path: 'new-purchase', loadChildren: './pages/new-purchase/new-purchase.module#NewPurchasePageModule' },
  { path: 'debts', loadChildren: './pages/debts/debts.module#DebtsPageModule' },
  // { path: 'select-from-list', loadChildren: './pages/modals/select-from-list/select-from-list.module#SelectFromListPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
