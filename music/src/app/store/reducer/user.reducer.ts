import { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { User } from "src/app/services/data-types";
import { SetUser } from '../actions/user.action';

export interface UserState {
  user: User;
}

export const initialState = {
  user: { nickname: '', userId: 0, avatarUrl: '', }
}

const reducer = createReducer(
  initialState,
  on(SetUser, (state, { user }) => ({ ...state, user })),
)

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action)
}
