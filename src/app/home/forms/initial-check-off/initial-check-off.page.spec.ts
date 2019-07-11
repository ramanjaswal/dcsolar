import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialCheckOffPage } from './initial-check-off.page';

describe('InitialCheckOffPage', () => {
  let component: InitialCheckOffPage;
  let fixture: ComponentFixture<InitialCheckOffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialCheckOffPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialCheckOffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
