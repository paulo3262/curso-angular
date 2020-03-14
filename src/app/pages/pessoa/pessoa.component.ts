import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customValidation } from './validacoes.globais';
import { PessoaService } from './service/pessoa.service';

@Component({
  selector: 'curso-angular-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit, OnDestroy {

  constructor(public pessoaService: PessoaService) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      customValidation
    ]),
    nome: new FormControl('', [
      Validators.required
    ])
  });

  send(form: any) {
    
    this.pessoaService.save(form).subscribe(ret => {
      if(ret) {
        localStorage.removeItem('pagina-pessoa');
        this.form.reset();
        alert("Valor do Formulário: " + JSON.stringify(form))
      }else {
        alert("invalido")
      }
    }, (erro) => {
      alert("erro n serviço")
    })
  }

  ngOnInit(): void {
    
    console.log(this.form);
    
    const local = localStorage.getItem('pagina-pessoa');
    if(local) {
      this.form.patchValue(JSON.parse(local));
    }
  }

  ngOnDestroy(): void {
    console.log("destroy");
    
    localStorage.setItem('pagina-pessoa', JSON.stringify(this.form.value));
  }

}
