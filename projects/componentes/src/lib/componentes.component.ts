import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-componentes',
  template: `
    <p>
      Componente da biblioteca alterei
    </p>
  `,
  styles: []
})
export class ComponentesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
