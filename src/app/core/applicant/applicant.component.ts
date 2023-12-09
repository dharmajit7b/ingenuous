import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-applicant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applicant.component.html',
  styleUrl: './applicant.component.scss'
})
export class ApplicantComponent {

}
