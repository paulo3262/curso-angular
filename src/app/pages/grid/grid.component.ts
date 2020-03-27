import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';

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
  
  @Input() colunas: {field: string, label: string}[];

  @Output() selecionou = new EventEmitter()

  selecionouDevExtreme(dadosdoDevExtreme: any) {
    this.selecionou.emit(dadosdoDevExtreme)
  }

  @ViewChild('grid') dataGrid: DxDataGridComponent;
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
  }


  ngOnInit(): void {
  }

}
