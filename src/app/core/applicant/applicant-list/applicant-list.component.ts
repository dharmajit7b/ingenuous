import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-applicant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicant-list.component.html',
  styleUrl: './applicant-list.component.scss',
})
export class ApplicantListComponent implements OnInit {
  public applicantList: Array<any> = [];

  constructor(
    private _router: Router,
    private _applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.applicantList = this._applicantService.getAllApplicantionData();
  }

  public onAddApplicantionClick() {
    this._router.navigate(['/applicant/form']);
  }

  public onEditClick(data: any) {
    this._router.navigate(['/applicant/edit', data?.id]);
  }

  public onViewClick(data: any) {
    this._router.navigate(['/applicant/view', data?.id]);
  }

  public onDeleteClick(data: any) {
    this._applicantService.deleteData(data);
    this.applicantList = this._applicantService.getAllApplicantionData();
  }
}
