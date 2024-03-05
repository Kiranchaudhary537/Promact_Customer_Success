import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'project-route',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  imports:[RouterLink,RouterOutlet]
})
export class ProjectDetailComponent implements OnInit {

  id: string;

  constructor(
    private route:ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    console.log("working");
  }
}
