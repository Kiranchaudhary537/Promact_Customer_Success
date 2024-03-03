import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone:true,
  selector: 'project-route',
  templateUrl: './project-resources.component.html',
  styleUrls: ['./project-resources.component.scss'],
  imports:[RouterLink,ReactiveFormsModule,NgFor]
})
export class ProjectResources implements OnInit {


  resourcesForms: FormGroup;
  displayedColumns = ['name', 'role', 'startDate', 'endDate', 'comment'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resourcesForms = this.fb.group({
      resourcesitems: this.fb.array([this.createFormGroup()])
    });
  }


  createFormGroup(): FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      comment: ['']
    });
  }

  resourcesitems(): FormArray {
    return this.resourcesForms.get('resourcesitems') as FormArray;
  }

  addRow(): void {
    const approveteamArray = this.resourcesForms.get('resourcesitems') as FormArray;
    approveteamArray.push(this.createFormGroup());
  }

  removeRow(index: number): void {
    const approveteamArray = this.resourcesForms.get('resourcesitems') as FormArray;
    approveteamArray.removeAt(index);
  }


  onSubmit(): void {
    console.log("clicked");
    console.log(this.resourcesForms);
    if (this.resourcesForms.valid) {
      console.log(this.resourcesForms.value);
      // Here you can submit the form data to your Angular Resource
      // For now, let's just log the form values
    }
  }
}
