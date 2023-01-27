import { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { User } from "src/app/services/data-types";
import { SetOpenLoginModal, SetUser } from '../actions/user.action';

export interface UserState {
  user: User;
  openLoginModal: boolean;
}

export const initialState = {
  user: { nickname: '', userId: 0, avatarUrl: '', },
  openLoginModal: false,
}

const reducer = createReducer(
  initialState,
  on(SetUser, (state, { user }) => ({ ...state, user })),
  on(SetOpenLoginModal, (state, { openLoginModal }) => ({ ...state, openLoginModal })),
)

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action)
}
