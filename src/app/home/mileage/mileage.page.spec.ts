import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileagePage } from './mileage.page';

describe('MileagePage', () => {
  let component: MileagePage;
  let fixture: ComponentFixture<MileagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
