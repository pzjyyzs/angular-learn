import { SetModalType, SetModalVisible, SetUserId, SetLikeId } from '../actions/member.action';
import { on, createReducer, Action } from '@ngrx/store';

export enum ModalTypes {
  Register = 'register',
    LoginByPhone = 'loginByPhone',
    Share = 'share',
    Like = 'like',
    Default = 'default'
}

export type MemberState = {
  modalVisible: boolean;
  modalType: ModalTypes;
  userId: string;
  likeId: string;
}

export const initialState: MemberState = {
  modalVisible: false,
  modalType: ModalTypes.Default,
  userId: '',
  likeId: ''
}

const reducer = createReducer(
  initialState,
  on(SetModalVisible,  (state, { modalVisible }) => ({ ...state, modalVisible })),
  on(SetModalType,  (state, { modalType }) => ({ ...state, modalType })),
  on(SetUserId,  (state, { id }) => ({ ...state, userId: id })),
  on(SetLikeId,  (state, { id }) => ({ ...state, likeId: id })),
  );

export function memberReducer(state: MemberState, action: Action) {
  return reducer(state, action);
}
