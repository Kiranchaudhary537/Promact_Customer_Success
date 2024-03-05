import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from './../../../app/Services/projectService';
import { Project } from 'src/app/Model/ProjectModel';

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
    private projectService:ProjectService
  ) {
    console.log(this.projectService.getAllProjects());
  }

  ngOnInit(): void {
    const subscription = this.projectService.getAllProjects().subscribe(
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
