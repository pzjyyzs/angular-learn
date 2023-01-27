import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './../reducer/user.reducer';
const selectPlayerStates = (state: UserState) => state;
export const getUser = createFeatureSelector<UserState>('user');
export const getUserInfo = createSelector(selectPlayerStates, (state: UserState) => state.user);
export const getOpenLoginModal = createSelector(selectPlayerStates, (state: UserState) => state.openLoginModal);
