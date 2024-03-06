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
import { ClientFeedback } from 'src/app/Model/ClientFeedbackModel';
import { ClientFeedbackService } from 'src/app/Services/clientfeedbackService';

@Component({
  standalone: true,
  selector: 'project-route',
  templateUrl: './client-feedback.component.html',
  styleUrls: ['./client-feedback.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, NgFor],
})
export class ClientFeedbackComponent implements OnInit {
  data: Array<ClientFeedback> = [];
  projectId: string = '';
  forms: FormGroup = new FormGroup({
    formitem: new FormGroup({
      feedbacktype: new FormControl(''),
      receivedate: new FormControl(''),
      details: new FormControl(''),
      action: new FormControl(''),
      closure: new FormControl(''),
    }),
  });
  unauthorizedPerson: boolean = true;
  displayedColumns = [
    'Feedback type',
    'Receive date',
    'Detailed Feeback',
    'Action Taken',
    'Closure Date',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientFeedbackService: ClientFeedbackService
  ) {
    this.projectId = this.route.snapshot.pathFromRoot[1].params['id'];
  }

  ngOnInit(): void {
    this.clientFeedbackService.getAllItem().subscribe(
      data => {
        console.log('Projects:', data);
        this.data = data;
        this.addExistingData(data);
      },
      error => {
        if (error.status == 403) {
          this.unauthorizedPerson = false;
          console.log(this.unauthorizedPerson);
          console.warn('Unauthorized access (403):', error);
        } else {
          console.error('Error fetching projects:', error);
        }
      }
    );
  }
  addExistingData(data: any): void {
    let existingData: any = [];
    data.forEach((element: any) => {
      existingData.push(this.existingDataFormGroup(element));
    });
    this.forms = this.fb.group({
      formitem:
        existingData == 0 ? this.fb.array([this.createFormGroup()]) : this.fb.array(existingData),
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      feedbacktype: ['', Validators.required],
      receivedate: ['', Validators.required],
      details: ['', Validators.required],
      action: ['', Validators.required],
      closure: ['', Validators.required],
    });
  }

  existingDataFormGroup(e: any): FormGroup {
    return this.fb.group({
      id: [e.id],
      feedbacktype: [e.feedbackType, Validators.required],
      receivedate: [e.dateReceived, Validators.required],
      details: [e.detailedFeedback, Validators.required],
      action: [e.actionTaken, Validators.required],
      closure: [e.closureDate, Validators.required],
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
    const controlAtIndex = approveteamArray.at(index);
    this.clientFeedbackService.deleteItem(controlAtIndex.value.id).subscribe(
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
    if (this.forms.valid) {
      this.forms.value.formitem.forEach(async e => {
        try {
          const modelDate: ClientFeedback = {
            projectId: this.projectId,
            dateReceived: e.receivedate,
            feedbackType: e.feedbacktype,
            detailedFeedback: e.details,
            actionTaken: e.action,
            closureDate: e.closure,
          };
          console.log(e);
          if (e.id != '') {
            const data = await this.clientFeedbackService.updateItem(e.id, modelDate).toPromise();
            console.log(data);
          } else {
            const data = await this.clientFeedbackService.createItem(modelDate).toPromise();
            console.log(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  }
}
