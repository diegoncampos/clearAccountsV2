import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchasesPage } from './purchases.page';
import { SharedModule } from '../../shareModule.module';

const routes: Routes = [
  {
    path: '',
    component: PurchasesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [PurchasesPage]
})
export class PurchasesPageModule {}
