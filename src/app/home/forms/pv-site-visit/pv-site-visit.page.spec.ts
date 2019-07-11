import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvSiteVisitPage } from './pv-site-visit.page';

describe('PvSiteVisitPage', () => {
  let component: PvSiteVisitPage;
  let fixture: ComponentFixture<PvSiteVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvSiteVisitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvSiteVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
