/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideomanagerlistComponent } from './videomanagerlist.component';

describe('VideomanagerlistComponent', () => {
  let component: VideomanagerlistComponent;
  let fixture: ComponentFixture<VideomanagerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideomanagerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomanagerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
