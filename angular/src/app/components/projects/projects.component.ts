import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from './../../../app/Services/projectService';
import { Project } from 'src/app/Model/ProjectModel';
import { AuthService } from '@abp/ng.core';

@Component({
  standalone:true,
  selector: 'all-project-route',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports:[RouterLink]
})
export class ProjectsComponent implements OnInit {

  //variable
  projectData: Array<Project> = [];
  constructor(
    private projectService:ProjectService,
    private authService: AuthService
  ) {

  }
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  login(): void{
    this.authService.navigateToLogin();
  }
  ngOnInit(): void {
     this.projectService.getAllProjects().subscribe(
      (data) => {
        console.log('Projects:', data);
        this.projectData = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }


}
