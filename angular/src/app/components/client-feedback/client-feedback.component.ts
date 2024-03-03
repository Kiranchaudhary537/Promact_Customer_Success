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
  templateUrl: './client-feedback.component.html',
  styleUrls: ['./client-feedback.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, NgFor],
})
export class ClientFeedbackComponent implements OnInit {
  forms: FormGroup;
  displayedColumns = ['Feedback type', 'Receive date', ' Detailed Feeback', 'Action Taken','Closure Date'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forms = this.fb.group({
      formitem: this.fb.array([this.createFormGroup()]),
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      feedbacktype: ['', Validators.required],
      receivedate: ['', Validators.required],
      details: ['', Validators.required],
      action: ['', Validators.required],
      closure: ['', Validators.required]
    });
  }

  getformitems(): FormArray {
    return this.forms.get('formitem') as FormArray;
  }

  addRow(): void {
    const approveteamArray = this.forms.get('formitem') as FormArray;
    approveteamArray.push(this.createFormGroup());
  }

  removeRow(index: number): void {
    const approveteamArray = this.forms.get('formitem') as FormArray;
    approveteamArray.removeAt(index);
  }

  onSubmit(): void {
    console.log('clicked');
    console.log(this.forms);
    if (this.forms.valid) {
      console.log(this.forms.value);
      // Here you can submit the form data to your Angular Resource
      // For now, let's just log the form values
    }
  }
}
