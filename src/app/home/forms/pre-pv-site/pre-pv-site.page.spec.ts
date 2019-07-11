import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePvSitePage } from './pre-pv-site.page';

describe('PrePvSitePage', () => {
  let component: PrePvSitePage;
  let fixture: ComponentFixture<PrePvSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePvSitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePvSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
