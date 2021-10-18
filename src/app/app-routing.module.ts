import { UserMaintenanceModule } from '@_features/user-maintenance/user-maintenance.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: 'usermaintenance', loadChildren: './features/user-maintenance/user-maintenance.module#UserMaintenanceModule' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
