import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'project-route',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  imports:[RouterLink,RouterOutlet]
})
export class ProjectDetailComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
    console.log("working");
  }
}
