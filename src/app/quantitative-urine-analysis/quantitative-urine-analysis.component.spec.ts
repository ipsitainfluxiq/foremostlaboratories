/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuantitativeUrineAnalysisComponent } from './quantitative-urine-analysis.component';

describe('QuantitativeUrineAnalysisComponent', () => {
  let component: QuantitativeUrineAnalysisComponent;
  let fixture: ComponentFixture<QuantitativeUrineAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitativeUrineAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativeUrineAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
