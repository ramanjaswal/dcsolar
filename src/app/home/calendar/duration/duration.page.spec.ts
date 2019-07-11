import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationPage } from './duration.page';

describe('DurationPage', () => {
  let component: DurationPage;
  let fixture: ComponentFixture<DurationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
