import { createAction, props } from '@ngrx/store';
import { PlayMode, Song } from 'src/app/services/data-types';

export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[]}>());
export const SetPlayMode = createAction('[player] Set playmode', props<{ playMode: PlayMode}>());
export const SetCurrentIndex = createAction('[player] Set current index', props<{ currentIndex: number}>());
export const SetSongList = createAction('[player] Set songlist', props<{ songList: Song[] }>());
