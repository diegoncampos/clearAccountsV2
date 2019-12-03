import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchasePage } from './new-purchase.page';

describe('NewPurchasePage', () => {
  let component: NewPurchasePage;
  let fixture: ComponentFixture<NewPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPurchasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
