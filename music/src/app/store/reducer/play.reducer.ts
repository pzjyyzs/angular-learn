import { Action, createReducer, on } from "@ngrx/store";
import { PlayMode, Song } from "src/app/services/data-types";
import { SetPlaying, SetPlayList, SetPlayMode } from "../actions/play.action";

export enum CurrentActions {
  Add,
  Play,
  Delete,
  Clear,
  Other
}

export interface PlayState {
  // 播放状态
  playing: boolean;

  // 播放模式
  playMode: PlayMode;

  // 歌曲列表
  songList: Song[];

  // 播放列表
  playList: Song[];

  // 当前正在播放的索引
  currentIndex: number;

  // 当前操作
  currentAction: CurrentActions;
}

export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
  currentAction: CurrentActions.Other
}

const reducer = createReducer(
  initialState,
  on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(SetPlayList, (state, { playList }) => ({ ...state, playList })),
  on(SetPlayMode, (state, { playMode }) => ({ ...state, playMode })),
)

export function playerReducer(state: PlayState | undefined, action: Action) {
  return reducer(state, action);
}
