import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialUiDemoComponent } from './material-ui-demo.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'' , component: MaterialUiDemoComponent}
    ])
  ]
})
export class MaterialUiDemoModule { }
