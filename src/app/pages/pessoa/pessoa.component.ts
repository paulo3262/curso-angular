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
  }

  ngOnDestroy(): void {
    console.log("destroy");

    localStorage.setItem('pagina-pessoa', JSON.stringify(this.form.value));
  }

}
