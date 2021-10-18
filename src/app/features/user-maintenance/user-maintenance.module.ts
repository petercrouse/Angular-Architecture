import { MyDatePickerModule } from 'mydatepicker/dist';
import { UserMaintenanceRoutingModule } from './user-maintenance-routing.module';
import { SharedModule } from '@_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMaintenanceShellComponent } from './containers/user-maintenance-shell/user-maintenance-shell.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-modal';
import { NgBusyModule } from 'ng-busy';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

@NgModule({
  declarations: [
    UserMaintenanceShellComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserMaintenanceRoutingModule,
    ModalModule,
    MyDatePickerModule,
    NgBusyModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature(
      [UserEffects]
    ),
    ToastyModule.forRoot()
  ],
  entryComponents: [
    UserEditComponent
  ]
})
export class UserMaintenanceModule { }
