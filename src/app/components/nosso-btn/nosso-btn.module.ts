import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NossoBtnComponent } from './nosso-btn.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NossoBtnComponent
  ],
  exports: [
    NossoBtnComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class NossoBtnModule { }
