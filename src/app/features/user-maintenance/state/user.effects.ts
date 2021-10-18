import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FICUser } from '../fic-user';
import { UserMaintenanceService } from '../services/user-maintenance.service';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions';


@Injectable()
export class UserEffects {

    constructor(private userMaintenanceService: UserMaintenanceService,
        private actions$: Actions) { }

    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadUsers),
        mergeMap(action =>
            this.userMaintenanceService.getFicUsers().pipe(
                map((users: FICUser[]) => (new userActions.LoadUsersSuccess(users))),
                catchError(err => of(new userActions.LoadUsersFail(err)))
            )
        )
    );

    @Effect()
    updateUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.UpdateUser),
        map((action: userActions.UpdateUser) => action.payload),
        mergeMap((user: FICUser) =>
            this.userMaintenanceService.updateUser(user).pipe(
                map(data => new userActions.UpdateUserSuccess(user)),
                catchError(err => of(new userActions.UpdateUserFail(err)))
            )
        )
    );

    @Effect()
    addUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.AddUser),
        map((action: userActions.AddUser) => action.payload),
        mergeMap((user: FICUser) =>
            this.userMaintenanceService.addNewCapFicUser(user).pipe(
                map(data => new userActions.AddUserSuccess(user)),
                catchError(err => of(new userActions.AddUserFail(err)))
            )
        )
    );

    // @Effect()
    // deleteUser$: Observable<Action> = this.actions$.pipe(
    //     ofType(userActions.UserActionTypes.DeleteUser),
    //     map((action: userActions.DeleteUser) => action.payload),
    //     mergeMap(userCPNumber =>
    //         this.userMaintenanceService.
    //     )
    // )

    @Effect()
    checkCpNumberStatus$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.CheckCpNumberStatus),
        map((action: userActions.CheckCpNumberStatus) => action.payload),
        mergeMap((cpNumber: string) =>
            this.userMaintenanceService.getCapFicUserStatus(cpNumber).pipe(
                map(status => new userActions.CheckCpNumberStatusSuccess(status)),
                catchError(err => of(new userActions.CheckCpNumberStatusFail(err)))
            )
        )
    );

    @Effect()
    restoreDeletedUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.RestoreDeletedUser),
        map((action: userActions.RestoreDeletedUser) => action.payload),
        mergeMap((cpNumber: string) =>
            this.userMaintenanceService.restoreDeletedCapFicUser(cpNumber).pipe(
                map(user => new userActions.RestoreDeletedUserSuccess(user)),
                catchError(err => of(new userActions.RestoreDeletedUserFail(err)))
            )
        )
    );
}
