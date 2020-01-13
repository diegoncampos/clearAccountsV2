import { NgModule } from '@angular/core';
import { HideFabDirective } from './directives/hide-fab.directive'


@NgModule({
 declarations: [HideFabDirective],
 exports: [HideFabDirective]
})
export class SharedModule { }