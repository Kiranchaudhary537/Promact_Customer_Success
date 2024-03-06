import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'project-route',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  imports: [RouterLink, RouterOutlet],
})
export class ProjectDetailComponent {
  id: string;

  constructor() {}

  ngOnInit(): void {}
}
