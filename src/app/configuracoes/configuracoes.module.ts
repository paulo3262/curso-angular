import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NguCarouselModule } from '@ngu/carousel';

import { ConfiguracoesComponent } from './configuracoes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NossoBtnModule } from '../components/nosso-btn/nosso-btn.module';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesComponent
  }
]

@NgModule({
  declarations: [ConfiguracoesComponent],
  imports: [
    CommonModule,
    NguCarouselModule,
    MatButtonModule,
    MatIconModule,
    NossoBtnModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfiguracoesModule { }
