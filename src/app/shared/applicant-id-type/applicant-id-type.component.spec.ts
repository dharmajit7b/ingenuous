import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantIdTypeComponent } from './applicant-id-type.component';

describe('ApplicantIdTypeComponent', () => {
  let component: ApplicantIdTypeComponent;
  let fixture: ComponentFixture<ApplicantIdTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantIdTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantIdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
