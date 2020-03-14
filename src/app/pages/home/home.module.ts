import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'pessoa',
        loadChildren: () => import('../../pages/pessoa/pessoa.module').then(m => m.PessoaModule)
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('src/app/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule)
      }
    ]
  },
];

@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule { }
