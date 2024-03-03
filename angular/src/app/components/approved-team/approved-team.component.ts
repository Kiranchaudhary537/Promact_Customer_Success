import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'project-route',
  templateUrl: './approved-team.component.html',
  styleUrls: ['./approved-team.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, NgFor],
})
export class ApprovedTeamComponent implements OnInit {
  approvedTeamForms: FormGroup;
  displayedColumns = ['No. Of resources', 'Role', ' Availability%', 'Duration'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.approvedTeamForms = this.fb.group({
      approvedteams: this.fb.array([this.createFormGroup()]),
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      noofresources: ['', Validators.required],
      role: ['', Validators.required],
      availability: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  approvedteams(): FormArray {
    return this.approvedTeamForms.get('approvedteams') as FormArray;
  }

  addRow(): void {
    const approveteamArray = this.approvedTeamForms.get('approvedteams') as FormArray;
    approveteamArray.push(this.createFormGroup());
  }

  removeRow(index: number): void {
    const approveteamArray = this.approvedTeamForms.get('approvedteams') as FormArray;
    approveteamArray.removeAt(index);
  }

  onSubmit(): void {
    console.log('clicked');
    console.log(this.approvedTeamForms);
    if (this.approvedTeamForms.valid) {
      console.log(this.approvedTeamForms.value);
      // Here you can submit the form data to your Angular Resource
      // For now, let's just log the form values
    }
  }
}
