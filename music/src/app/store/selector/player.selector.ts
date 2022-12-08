import { PlayState } from './../reducer/play.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Song } from "src/app/services/data-types";

const selectPlayerStates = (state: PlayState) => state;
export const getPlayer = createFeatureSelector<PlayState>('player');
export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex}: PlayState) => playList[currentIndex]);
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
