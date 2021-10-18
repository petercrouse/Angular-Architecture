import { UserMaintenanceShellComponent } from './containers/user-maintenance-shell/user-maintenance-shell.component';
import { PageNotFoundComponent } from '@_shared/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@_shared/shared.module';

const routes: Routes = [
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '', component: UserMaintenanceShellComponent },
  { path: '**', redirectTo: '', pathMatch: 'pagenotfound' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserMaintenanceRoutingModule { }
