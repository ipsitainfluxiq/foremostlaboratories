/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideomanagereditComponent } from './videomanageredit.component';

describe('VideomanagereditComponent', () => {
  let component: VideomanagereditComponent;
  let fixture: ComponentFixture<VideomanagereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideomanagereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomanagereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
