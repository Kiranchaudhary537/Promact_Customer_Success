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
  templateUrl: './moms.component.html',
  styleUrls: ['./moms.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, NgFor],
})
export class MomsComponent implements OnInit {
  forms: FormGroup;
  displayedColumns = ['Date', 'Duration', 'MoM Link', 'Comments'];

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
      date: ['', Validators.required],
      duration: ['', Validators.required],
      links: ['', Validators.required],
      comments: ['', Validators.required],
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
