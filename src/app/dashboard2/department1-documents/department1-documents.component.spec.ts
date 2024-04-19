import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Department1DocumentsComponent } from './department1-documents.component';

describe('Department1DocumentsComponent', () => {
  let component: Department1DocumentsComponent;
  let fixture: ComponentFixture<Department1DocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Department1DocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Department1DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
