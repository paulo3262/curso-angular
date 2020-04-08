import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ContentChildren, QueryList, SimpleChanges } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';
import { MatInput } from '@angular/material/input';
import { FormGroup, NgModel } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'curso-angular-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private http: HttpClient) { }

  datadosDaGrid: any[] = []

  @Input() exibirFiltroColuna: boolean = true;

  private _dataSource: string = '';
  @Input()
  public get dataSource() : string {
    return this._dataSource;
  }
  public set dataSource(v : string) {
    this._dataSource = v;

    this.http.get(this._dataSource).subscribe((retorno: any) => {
      this.datadosDaGrid = retorno;
    })
  }

  resetarGrid() {
    this.datadosDaGrid = [];
    this.http.get(this._dataSource).subscribe((retorno: any) => {
      this.datadosDaGrid = retorno;
    })
  }

  @ContentChildren(NgModel, {descendants: true}) inputs: QueryList<NgModel>;

  form: FormGroup = new FormGroup({});

  @Input() formularioEsconder: boolean = true;
  linhaSelecionada: any;

  @Input() mestredetalhe: any;
  
  @Input() colunas: {field: string, label: string}[];

  @Output() selecionou = new EventEmitter()

  selecionouDevExtreme(dadosdoDevExtreme: any) {
    this.selecionou.emit(dadosdoDevExtreme)
    this.linhaSelecionada = dadosdoDevExtreme.selectedRowsData[0];
  }

  @ViewChild('grid') dataGrid: DxDataGridComponent;

  add(): void {
    this.formularioEsconder = false;
    localStorage.setItem('GRID-Form-aberto', JSON.stringify(this.formularioEsconder));
  }

  ativarDesativar() {
    this.datadosDaGrid.forEach(itm => {
      if(JSON.stringify(this.linhaSelecionada) == JSON.stringify(itm)) {
        itm.Ativo = !this.linhaSelecionada.Ativo;
      }
    })
  }

  edit() {
    this.formularioEsconder = false;
    this.form.patchValue(this.linhaSelecionada)
    localStorage.setItem('GRID-Form-aberto', JSON.stringify(this.formularioEsconder));
  }

  salvar() {    
    //serviço salvar pessoa
    this.http.post('api', this.form.value).pipe(map((resposta: any) => {
      if (resposta.success) {
        alert("Sucesso Salvou")
      } else {
        alert("Erro ao Salvar")
      }
    })).subscribe(ret => {
      this.resetarGrid();
      this.formularioEsconder = true;
      setTimeout(() => {
        this.datadosDaGrid.push(this.form.value)
        this.form.reset();
      }, 1000);
    });
  }

  voltar() {
    this.formularioEsconder = true;
    this.form.reset();
    localStorage.setItem('GRID-Form-aberto', JSON.stringify(this.formularioEsconder));
  }

  ngAfterViewInit(): void {
    this.dataGrid.instance.element().addEventListener('keyup', (e: KeyboardEvent) => {

      const selKey = this.dataGrid.instance.getSelectedRowKeys();
      if (selKey.length) {
        const currentKey = selKey[selKey.length - 1];
        let index = this.dataGrid.instance.getRowIndexByKey(currentKey);
        if (e.keyCode === 38) {
          index--;
        } else if (e.keyCode === 40) {
          index++;
        }

        let list = [];
        if (e.ctrlKey) {
          if (e.keyCode === 38) {
            selKey.forEach(item => { list.push(this.dataGrid.instance.getRowIndexByKey(item)); });
            if (selKey.length > 1) {
              list.splice(selKey.length - 1, 1);
            }
          } else if (e.keyCode === 40) {
            selKey.forEach(item => { list.push(this.dataGrid.instance.getRowIndexByKey(item)); });
          }
          list.push(index);
        } else {
          list.push(index);
        }

        if (index >= 0 && index < this.dataGrid.instance.totalCount()) {
          this.dataGrid.instance.selectRowsByIndexes(list);
          if ([38, 40].indexOf(e.keyCode) !== -1) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    });
    
    this.inputs.forEach(input => {
      this.form.addControl(input.name, input.control);
    })

    const local = localStorage.getItem('GRID');
    const formAberto = localStorage.getItem('GRID-Form-aberto');
    if(formAberto == 'false') {
      this.formularioEsconder = false;
    }
    setTimeout(() => { 
      this.form.patchValue(JSON.parse(local));
    });

    this.form.statusChanges.subscribe(staus => {
      if(status === 'VALID') {
        localStorage.setItem('GRID', JSON.stringify(this.form.value));
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.setItem('GRID', JSON.stringify(this.form.value));
  }

}
