import { UserActions, UserActionTypes } from './user.actions';
import { Customer } from '../customer';

export interface UserState {
    currentUserCPNumber: string | null;
    users: Customer[];
    error: string;
    cpNumberStatus: string;
    newCpNumberToStatusCheck: string;
}

const initialUserState: UserState = {
    currentUserCPNumber: null,
    users: [],
    error: '',
    cpNumberStatus: '',
    newCpNumberToStatusCheck: ''
};

export function reducer(state = initialUserState, action: UserActions): UserState {

    switch (action.type) {
        case UserActionTypes.SetCurrentUser:
            return {
                ...state,
                currentUserCPNumber: action.payload.customerNumber
            };

        case UserActionTypes.ClearCurrentUser:
            return {
                ...state,
                currentUserCPNumber: null
            };

        case UserActionTypes.InitializeCurrentUser:
            return {
                ...state,
                currentUserCPNumber: ''
            };

        case UserActionTypes.LoadUsersSuccess:
            return {
                ...state,
                users: action.payload,
                error: ''
            };

        case UserActionTypes.LoadUsersFail:
            return {
                ...state,
                users: [],
                error: action.payload
            };

        case UserActionTypes.UpdateUserSuccess:
            const updatedUsers = state.users.map(
                user => action.payload.customerNumber === user.customerNumber ? action.payload : user
            );
            return {
                ...state,
                users: updatedUsers,
                currentUserCPNumber: action.payload.customerNumber,
                error: ''
            };

        case UserActionTypes.UpdateUserFail:
            return {
                ...state,
                error: action.payload
            };

        case UserActionTypes.AddUserSuccess:
            return {
                ...state,
                users: [...state.users, action.payload],
                currentUserCPNumber: action.payload.customerNumber,
                error: ''
            };

        case UserActionTypes.AddUserFail:
            return {
                ...state,
                error: action.payload
            };

        case UserActionTypes.DeleteUserSuccess:
            return {
               ...state,
               users: state.users.filter(user => user.customerNumber === action.payload),
               error: ''
            };

        case UserActionTypes.DeleteUserFail:
            return {
                ...state,
                error: action.payload
            };

        case UserActionTypes.CheckCpNumberStatusSuccess:
            return {
                ...state,
                cpNumberStatus: action.payload.result,
                error: ''
            };

        case UserActionTypes.CheckCpNumberStatusFail:
            return {
                ...state,
                error: action.payload
            };

        case UserActionTypes.RestoreDeletedUserSuccess:
            return {
                ...state,
                users: [...state.users, action.payload],
                currentUserCPNumber: action.payload.customerNumber,
                error: ''
            };

        case UserActionTypes.RestoreDeletedUserFail:
            return {
                ...state,
                error: action.payload
            };

        case UserActionTypes.SetNewCpNumberToCheckStatus:
            return {
                ...state,
                newCpNumberToStatusCheck: action.payload
            };

        default:
            return state;
    }
}
