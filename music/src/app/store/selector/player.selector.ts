import { createFeatureSelector } from "@ngrx/store";
import { PlayState } from "../reducer/play.reducer";

const selectPlayerStates = (state: PlayState) => state;
export const getPlayer = createFeatureSelector<PlayState>('player');
