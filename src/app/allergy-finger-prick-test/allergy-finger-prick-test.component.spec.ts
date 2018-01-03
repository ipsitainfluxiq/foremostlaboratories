/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllergyFingerPrickTestComponent } from './allergy-finger-prick-test.component';

describe('AllergyFingerPrickTestComponent', () => {
  let component: AllergyFingerPrickTestComponent;
  let fixture: ComponentFixture<AllergyFingerPrickTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergyFingerPrickTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyFingerPrickTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
