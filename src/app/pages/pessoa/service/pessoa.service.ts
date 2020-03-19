import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PessoaService {

  constructor(public http: HttpClient) { }

  save(dadosDoFormulario: any): Observable<boolean> {
    return this.http.post('api', dadosDoFormulario).pipe(map((resposta: any) => {
      if (resposta.success) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
