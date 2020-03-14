import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'curso-angular-nosso-btn',
  templateUrl: './nosso-btn.component.html',
  styleUrls: ['./nosso-btn.component.css'],
  host: {
    '[ngStyle]': '{width: width + "px"}'
  }
})
export class NossoBtnComponent implements OnInit {

  constructor() { }

  private _width: number = 30;
  @Input()
  public get width() {
    return this._width;
  }
  public set width(v: number) {
    this._width = v;
  }

  private _label: number = 30;
  @Input('label')
  public get label() {
    return this._label;
  }
  public set label(v: number) {
    this._label = v;
  }

  ngOnInit(): void {
  }

}
