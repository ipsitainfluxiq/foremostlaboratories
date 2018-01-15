/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideomanageraddComponent } from './videomanageradd.component';

describe('VideomanageraddComponent', () => {
  let component: VideomanageraddComponent;
  let fixture: ComponentFixture<VideomanageraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideomanageraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomanageraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
