import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromUsers from './user.reducer';

export interface State extends fromRoot.State {
    users: fromUsers.UserState;
}

const getUserMaintenanceFeatureState = createFeatureSelector<fromUsers.UserState>('users');

export const getCurrentUserCPNumber = createSelector(
    getUserMaintenanceFeatureState,
    state => state.currentUserCPNumber
);

export const getUsers = createSelector(
    getUserMaintenanceFeatureState,
    state => state.users
);

export const getError = createSelector(
    getUserMaintenanceFeatureState,
    state => state.error
);

export const getCpNumberStatus = createSelector(
    getUserMaintenanceFeatureState,
    state => state.cpNumberStatus
);

export const getCpNumberToStatusCheck = createSelector(
    getUserMaintenanceFeatureState,
    state => state.newCpNumberToStatusCheck
);

export const getCurrentUser = createSelector(
    getUserMaintenanceFeatureState,
    getCurrentUserCPNumber,
    (state, currentUserCPNumber) => {
        if (currentUserCPNumber === '') {
            return {
                cpNumber: '',
                ficUser: '',
                deleted: false,
                gender: '',
                title: '',
                firstName: '',
                lastName: '',
                birthdate: new Date(),
                ssn: '',
                email: '',
                occupation: '',
                ficPassword: ''
            };
        } else {
            return currentUserCPNumber ? state.users.find(p => p.cpNumber === currentUserCPNumber) : null;
        }
    }
);
