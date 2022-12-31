import { PlayState } from './../reducer/play.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectPlayerStates = (state: PlayState) => state;
export const getPlayer = createFeatureSelector<PlayState>('player');
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
export const getPlayMode = createSelector(selectPlayerStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayerStates, (state: PlayState) => state.currentIndex);
export const getSongList = createSelector(selectPlayerStates, (state: PlayState) => state.songList);
export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex }: PlayState) => playList[currentIndex]);
