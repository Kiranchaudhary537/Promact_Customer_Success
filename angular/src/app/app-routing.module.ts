import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailComponent } from './components/project-details/project-details.component';
import { ApprovedTeamComponent } from './components/approved-team/approved-team.component';
import { ClientFeedbackComponent } from './components/client-feedback/client-feedback.component';
import { MomsComponent } from './components/moms/moms.component';
import { ProjectUpdatesComponent } from './components/project-updates/project-updates.component';
import { ProjectResources } from './components/project-resources/project-resources.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
    ],
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    children: [
      {
        path: 'approvedteam',
        component: ApprovedTeamComponent,
      },
      {
        path: 'clientfeedback',
        component: ClientFeedbackComponent,
      },
      {
        path: 'moms',
        component: MomsComponent,
      },
      {
        path: 'projectupdates',
        component: ProjectUpdatesComponent,
      },
      {
        path: 'projectresources',
        component: ProjectResources,
      },
    ],
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
