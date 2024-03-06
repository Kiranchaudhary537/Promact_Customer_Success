import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { projectResourceModel } from 'src/app/Model/ProjectResourceModel';
import { ProjectResourceService } from 'src/app/Services/projectResourceService';

@Component({
  standalone: true,
  selector: 'project-route',
  templateUrl: './project-resources.component.html',
  styleUrls: ['./project-resources.component.scss'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class ProjectResources implements OnInit {
  data: Array<projectResourceModel> = [];
  projectId: string = ';';
  resourcesForms: FormGroup = new FormGroup({
    resourcesitems: new FormGroup({
      name: new FormControl(''),
      role: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      allocationPercentage: new FormControl(''),
      comment: new FormControl(''),
    }),
  });
  displayedColumns = ['role', 'allocationPercentage', 'startDate', 'endDate', 'comment'];

  constructor(
    private fb: FormBuilder,
    private projectResourceService: ProjectResourceService,
    private route: ActivatedRoute
  ) {
    this.projectId = this.route.snapshot.pathFromRoot[1].params['id'];
  }

  ngOnInit(): void {
    this.projectResourceService.getAllProjects().subscribe(
      data => {
        console.log('Projects:', data);
        this.data = data;
        this.addExistingData(data);
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  addExistingData(data: any): void {
    let existingData: any = [];
    data.forEach((element: any) => {
      existingData.push(this.existingDataFormGroup(element));
    });
    this.resourcesForms = this.fb.group({
      resourcesitems:
        existingData == 0 ? this.fb.array([this.createFormGroup()]) : this.fb.array(existingData),
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      allocationPercentage: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  existingDataFormGroup(e: any): FormGroup {
    return this.fb.group({
      id: [e.id],
      name: [e.name, Validators.required],
      role: [e.role, Validators.required],
      startDate: [e.start, Validators.required],
      endDate: [e.end, Validators.required],
      allocationPercentage: [e.allocationPercentage, Validators.required],
      comment: [e.comment, Validators.required],
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
    const controlAtIndex = approveteamArray.at(index);
    // console.log(controlAtIndex.value.id);
    this.projectResourceService.deleteProject(controlAtIndex.value.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('erorr');
      }
    );
    approveteamArray.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.resourcesForms);
    if (this.resourcesForms.valid) {
      console.log(this.resourcesForms.value);
      this.resourcesForms.value.resourcesitems.map(e => {
        const modelDate: projectResourceModel = {
          projectId: this.projectId,
          name: e.name,
          allocationPercentage: e.allocationPercentage,
          start: e.startDate,
          end: e.startEnd,
          role: e.role,
          comment: e.comment,
        };
        console.log(e);
        if (e.id != null) {
          this.projectResourceService.createProject(modelDate).subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.error('erorr');
            }
          );
        } else {
          this.projectResourceService.updateProject(e.id, modelDate).subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.error('erorr');
            }
          );
        }
      });
    }
  }
}

// add for new
// update for exsting
// const dateString = "04/03/2024";
// const parts = dateString.split('/');
// const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`).toISOString();

// console.log(formattedDate);
