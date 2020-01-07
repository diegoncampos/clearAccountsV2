import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFromListPage } from './select-from-list.page';

describe('SelectFromListPage', () => {
  let component: SelectFromListPage;
  let fixture: ComponentFixture<SelectFromListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFromListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFromListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
