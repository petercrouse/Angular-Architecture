import { FICUser } from '../fic-user';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    SetCurrentUser = '[User] Set Current User',
    ClearCurrentUser = '[User] Clear Current User',
    InitializeCurrentUser = '[User] Initialize Current User',
    LoadUsers = '[User] Load Users',
    LoadUsersSuccess = '[User] Load Users Success',
    LoadUsersFail = '[User] Load Users Fail',
    UpdateUser = '[User] Update User',
    UpdateUserSuccess = '[User] Update User Success',
    UpdateUserFail = '[User] Update User Fail',
    AddUser = '[User] Add User',
    AddUserSuccess = '[User] Add User Success',
    AddUserFail = '[User] Add User Fail',
    DeleteUser = '[User] Delete User',
    DeleteUserSuccess = '[User] Delete User Success',
    DeleteUserFail = '[User] Delete User Fail',
    CheckCpNumberStatus = '[User] Check CP Number Status',
    CheckCpNumberStatusSuccess = '[User] Check CP Number Status Success',
    CheckCpNumberStatusFail = '[User] Check CP Number Status Fail',
    RestoreDeletedUser = '[User] Restore Deleted User',
    RestoreDeletedUserSuccess = '[User] Restore Deleted User Success',
    RestoreDeletedUserFail = '[User] Restore Deleted User Fail',
    SetNewCpNumberToCheckStatus = '[User] Set New CP Number To Check Status'
}

export class SetCurrentUser implements Action {
    readonly type = UserActionTypes.SetCurrentUser;

    constructor(public payload: FICUser) { }
}

export class ClearCurrentUser implements Action {
    readonly type = UserActionTypes.ClearCurrentUser;
}

export class InitializeCurrentUser implements Action {
    readonly type = UserActionTypes.InitializeCurrentUser;
}

export class LoadUsers implements Action {
    readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LoadUsersSuccess;

    constructor(public payload: FICUser[]) {}
}

export class LoadUsersFail implements Action {
    readonly type = UserActionTypes.LoadUsersFail;

    constructor(public payload: string) {}
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UpdateUser;

    constructor(public payload: FICUser) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserSuccess;

    constructor(public payload: FICUser) {}
}

export class UpdateUserFail implements Action {
    readonly type = UserActionTypes.UpdateUserFail;

    constructor(public payload: string) {}
}

export class AddUser implements Action {
    readonly type = UserActionTypes.AddUser;

    constructor(public payload: FICUser) {}
}

export class AddUserSuccess implements Action {
    readonly type = UserActionTypes.AddUserSuccess;

    constructor(public payload: FICUser) {}
}

export class AddUserFail implements Action {
    readonly type = UserActionTypes.AddUserFail;

    constructor(public payload: string) {}
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DeleteUser;

    constructor(public payload: string) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UserActionTypes.DeleteUserSuccess;

    constructor(public payload: string) {}
}

export class DeleteUserFail implements Action {
    readonly type = UserActionTypes.DeleteUserFail;

    constructor(public payload: string) {}
}

export class CheckCpNumberStatus implements Action {
    readonly type = UserActionTypes.CheckCpNumberStatus;

    constructor(public payload: string) {}
}

export class CheckCpNumberStatusSuccess implements Action {
    readonly type = UserActionTypes.CheckCpNumberStatusSuccess;

    constructor(public payload: any) {}
}

export class CheckCpNumberStatusFail implements Action {
    readonly type = UserActionTypes.CheckCpNumberStatusFail;

    constructor(public payload: string) {}
}

export class RestoreDeletedUser implements Action {
    readonly type = UserActionTypes.RestoreDeletedUser;

    constructor(public payload: string) {}
}

export class RestoreDeletedUserSuccess implements Action {
    readonly type = UserActionTypes.RestoreDeletedUserSuccess;

    constructor(public payload: FICUser) {}
}

export class RestoreDeletedUserFail implements Action {
    readonly type = UserActionTypes.RestoreDeletedUserFail;

    constructor(public payload: string) {}
}

export class SetNewCpNumberToCheckStatus implements Action {
    readonly type = UserActionTypes.SetNewCpNumberToCheckStatus;

    constructor(public payload: string) {}
}

export type UserActions = SetCurrentUser
    | ClearCurrentUser
    | InitializeCurrentUser
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail
    | AddUser
    | AddUserSuccess
    | AddUserFail
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFail
    | CheckCpNumberStatus
    | CheckCpNumberStatusSuccess
    | CheckCpNumberStatusFail
    | RestoreDeletedUser
    | RestoreDeletedUserSuccess
    | RestoreDeletedUserFail
    | SetNewCpNumberToCheckStatus;
