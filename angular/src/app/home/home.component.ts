import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../Services/projectService';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule, RouterOutlet, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean;
  inProgress: boolean;
  currentStage: number = 1;
  clientForm = this.fb.group({
    clientName: [null, [Validators.required]],
    clientEmail: [null, [Validators.required, Validators.email]],
  });
  managerForm = this.fb.group({
    manager: [null, [Validators.required]],
  });
  managers = [
    { id: 1, name: 'Dipa' },
    { id: 2, name: 'Firoza' },
  ];
  projectForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
  });
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    console.log(this.projectService.getAllProjects());
  }

  ngOnInit(): void {

    const subscription = this.projectService.getAllProjects().subscribe(
      (data) => {
        console.log('Projects:',data);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  login() {
    this.authService.navigateToLogin();
  }
  nextStage() {
    this.currentStage++;
  }

  prevStage() {
    this.currentStage--;
  }
  save() {
    if (this.projectForm.invalid) return;
    if (this.currentStage === 1 && this.clientForm.invalid) return;
    if (this.currentStage === 2 && this.managerForm.invalid) return;
    console.log(this.projectForm.value);

  }
}
