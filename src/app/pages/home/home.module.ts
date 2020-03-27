import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '../grid/grid.module';

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
      },
      // {
      //   path: 'grid',
      //   loadChildren: () => import('src/app/pages/grid/grid.module').then(m => m.GridModule)
      // }
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
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    GridModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule { }
