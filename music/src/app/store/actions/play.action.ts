import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/data-types';

export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[]}>());
