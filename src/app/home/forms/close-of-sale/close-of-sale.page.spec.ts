import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOfSalePage } from './close-of-sale.page';

describe('CloseOfSalePage', () => {
  let component: CloseOfSalePage;
  let fixture: ComponentFixture<CloseOfSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseOfSalePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOfSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
