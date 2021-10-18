import { takeUntil } from 'rxjs/operators';
import { UserEditComponent } from '@_features/user-maintenance/components/user-edit/user-edit.component';
import { Store, select } from '@ngrx/store';
import { FICUser } from '@_features/user-maintenance/fic-user';
import { Observable, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import * as fromUser from '@_features/user-maintenance/state';
import * as userActions from '@_features/user-maintenance/state/user.actions';

@Component({
  selector: 'app-user-maintenance-shell',
  templateUrl: './user-maintenance-shell.component.html',
  styleUrls: ['./user-maintenance-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMaintenanceShellComponent implements OnInit {

  selectedUser$: Observable<string>;
  currentUser$: Observable<FICUser>;
  users$: Observable<FICUser[]>;
  errorMessage$: Observable<string>;
  ngDestroyed$ = new Subject();
  cpNumberStatus$: Observable<string>;
  cpNumberToStatusCheck$: Observable<string>;

  constructor(private store: Store<fromUser.State>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    this.selectedUser$ = this.store.pipe(select(fromUser.getCurrentUserCPNumber));
    this.errorMessage$ = this.store.pipe(select(fromUser.getError));
    this.cpNumberStatus$ = this.store.pipe(select(fromUser.getCpNumberStatus));
    this.cpNumberToStatusCheck$ = this.store.pipe(select(fromUser.getCpNumberToStatusCheck));
    this.currentUser$ = this.store.pipe(select(fromUser.getCurrentUser));
  }

  userSelected(user: FICUser): void {
    this.store.dispatch(new userActions.SetCurrentUser(user));
  }

  clearCurrentUser(): void {
    this.store.dispatch(new userActions.ClearCurrentUser());
  }

  addUser(user: FICUser): void {
    this.store.dispatch(new userActions.AddUser(user));
  }

  restoreUser(cpNumber: string): void {
    this.store.dispatch(new userActions.RestoreDeletedUser(cpNumber));
  }

  checkUserStatus(cpNumber: string): void {
    this.store.dispatch(new userActions.CheckCpNumberStatusSuccess({ result: ''}));
    this.store.dispatch(new userActions.CheckCpNumberStatus(cpNumber));
  }

  setCpNumberToCheck(cpNumber: string): void {
    this.store.dispatch(new userActions.SetNewCpNumberToCheckStatus(cpNumber));
  }

  deleteUser(user: FICUser): void {
    this.store.dispatch(new userActions.DeleteUser(user.cpNumber));
  }

  initializeNewUser(): void {
    this.store.dispatch(new userActions.InitializeCurrentUser());
  }

  updateUser(user: FICUser): void {
    this.store.dispatch(new userActions.UpdateUser(user));
  }
}
