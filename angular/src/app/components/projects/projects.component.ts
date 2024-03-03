import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone:true,
  selector: 'all-project-route',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports:[RouterLink]
})
export class ProjectsComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
    console.log("working");
  }
}
