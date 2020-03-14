import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NossoBtnComponent } from './nosso-btn.component';

describe('NossoBtnComponent', () => {
  let component: NossoBtnComponent;
  let fixture: ComponentFixture<NossoBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NossoBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NossoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
