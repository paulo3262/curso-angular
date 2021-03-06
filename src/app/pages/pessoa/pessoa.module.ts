import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';

import { PessoaComponent } from './pessoa.component';
import { NossoBtnModule } from 'src/app/components/nosso-btn/nosso-btn.module';
import { ComponentesModule } from 'componentes';
import {PessoaService} from './service/pessoa.service';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '../grid/grid.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadModule } from 'src/app/components/upload/upload.module';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent
  }
];

@NgModule({
  declarations: [PessoaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    NossoBtnModule,
    ComponentesModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    GridModule,
    UploadModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule { }
