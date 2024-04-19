import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhiwasiCertificateComponent } from './aadhiwasi-certificate.component';

describe('AadhiwasiCertificateComponent', () => {
  let component: AadhiwasiCertificateComponent;
  let fixture: ComponentFixture<AadhiwasiCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AadhiwasiCertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AadhiwasiCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
