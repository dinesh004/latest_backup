import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhiwasiDocumentsComponent } from './aadhiwasi-documents.component';

describe('AadhiwasiDocumentsComponent', () => {
  let component: AadhiwasiDocumentsComponent;
  let fixture: ComponentFixture<AadhiwasiDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AadhiwasiDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AadhiwasiDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
