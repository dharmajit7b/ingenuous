import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicantIdTypeComponent } from '../../../shared/applicant-id-type/applicant-id-type.component';
import { ApplicantService } from '../../services/applicant.service';
import { map } from 'rxjs';

const numAlphabetRegex = /^[a-zA-Z0-9]*$/;

@Component({
  selector: 'app-applicant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ApplicantIdTypeComponent,
  ],
  templateUrl: './applicant-form.component.html',
  styleUrl: './applicant-form.component.scss',
})
export class ApplicantFormComponent implements OnInit {
  public applicantFormstructure: FormGroup = this.fb.group({
    id: [''],
    applicationNumber: ['', [Validators.pattern(numAlphabetRegex)]],
    applicationType: [''],
    amount: [''],
    status: [''],
    applicants: this.fb.array([], [Validators.required]),
  });

  public selectedApplicant: number = 0;
  // "options" - array of possible options
  public applicantIDTypeOptions: Array<string> = [
    'Australian Passport',
    'Driving Licence',
    'Foreign Passport',
    'Foreign ID Card',
  ];
  public selectApplicantIDType: Array<string> = [];

  private applicantID: number = 0;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _applicantService: ApplicantService
  ) {
    // selecte of  applicant
    this._activatedRoute.params
      .pipe(
        map((el: any) => {
          if (el?.id) {
            this.applicantID = Number(el?.id);
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
    if (this.getPage() !== 'create') {
      let data = this._applicantService.getApplicantionDataById(
        this.applicantID
      );
      data?.applicants?.map((el:any) => {
        this.addApplicant();
      });
      this.applicantFormstructure.patchValue(data);
      this.applicants?.setValue(data?.applicants ||[]);

      if(this.getPage() == 'view'){
        this.applicantFormstructure.disable();
      }
    }
  }
  //form array
  public get applicants(): FormArray {
    return this.applicantFormstructure?.get('applicants') as FormArray;
  }

  public addApplicant() {
    const applicantForm: FormGroup = this.fb.group({
      fullName: ['', [Validators.required]],
      applicantIdType: [],
      gender: [''],
    });

    this.applicants?.push(applicantForm); // push in formArray
  }

  public removeApplicant(index: number) {
    this.applicants?.removeAt(index);
  }

  public setSelectedApplicant(index: number) {
    this.selectedApplicant = index;
  }

  public selectedApplicantsIds(data: any, index: number) {
    this.selectApplicantIDType = [...data];
    this.applicants
      .at(index)
      ?.get('applicantIdType')
      ?.setValue([...data]);
  }

  public onFormSubmit() {
    this.applicantFormstructure.markAllAsTouched();
    if (this.applicantFormstructure.valid) {
      let formData =this.applicantFormstructure.getRawValue();
      if(formData?.id){
        this._applicantService.updateData(formData);
      }else{
        this._applicantService.createData(formData);
      }
      this._router.navigate(['/applicant/list']);
    }
  }

  public onFormReset() {
    this.applicantFormstructure.reset({ applicationType: '' });
  }

  public getPage(): string {
    if (this._router?.url?.includes('view')) {
      return 'view';
    } else if (this._router?.url?.includes('edit')) {
      return 'edit';
    } else {
      return 'create';
    }
  }
}
