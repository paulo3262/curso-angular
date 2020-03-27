import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { customValidation } from './validacoes.globais';
import { PessoaService } from './service/pessoa.service';

@Component({
  selector: 'curso-angular-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit, OnDestroy {

  constructor(public pessoaService: PessoaService) { }

  loading: boolean = false;

  colunas: any = [
    {
      field: 'FirstName',
      label: "Primeiro Nome"
    },
    {
      field: 'BirthDate',
      label: "Data de nascimento"
    },
    {
      field: 'Address',
      label: "Endereço"
    },
  ]

  colunas2: any = [
    {
      field: 'ID',
      label: "###"
    },
    {
      field: 'FirstName',
      label: "Primeiro Nome"
    },
  ]

  employes2: any = 'http://www.mocky.io/v2/5e7e7e74300000dd134afb33'

  employes: string = 'http://www.mocky.io/v2/5e7e7d5b30000029004afb31';

  @ViewChild('form') form: NgForm;

  // form: FormGroup = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email,
  //     customValidation
  //   ]),
  //   nome: new FormControl('', [
  //     Validators.required
  //   ]),
  //   telefone: new FormControl('')
  // });


  selecionounaGrid(dadosSelecionado: any) {
    console.log(dadosSelecionado);  
    
  }

  send(form: any) {
    this.loading = true;
    console.log(form);

    this.pessoaService.save(form).subscribe(ret => {
      if (ret) {
        this.loading = false;
        localStorage.removeItem('pagina-pessoa');
        this.form.reset();
        alert("Valor do Formulário: " + JSON.stringify(form));
      } else {
        alert("invalido")
      }
    }, (erro) => {
      this.loading = false;
      alert("erro n serviço")
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const local = localStorage.getItem('pagina-pessoa');
    if (local) {
      setTimeout(() => {

        this.form.control.get('email').setValidators([
          Validators.required,
          Validators.email,
          customValidation
        ])
        this.form.setValue(JSON.parse(local));
      });
    }

    this.form.statusChanges.subscribe(staus => {
      if(status === 'VALID') {
        localStorage.setItem('pagina-pessoa', JSON.stringify(this.form.value));
      }
    })
  }

  ngOnDestroy(): void {
    console.log("destroy");

    localStorage.setItem('pagina-pessoa', JSON.stringify(this.form.value));
  }

}
