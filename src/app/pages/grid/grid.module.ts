import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { RouterModule, Routes } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: GridComponent
  }
]

@NgModule({
  declarations: [GridComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    DxDataGridModule,
    FlexLayoutModule,
  ],
  exports: [
    GridComponent,
  ]

})
export class GridModule { }
