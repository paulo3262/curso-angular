import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { RouterModule, Routes } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: GridComponent
  }
]

@NgModule({
  declarations: [GridComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DxDataGridModule
  ],
  exports: [
    GridComponent,
    RouterModule
  ]

})
export class GridModule { }
