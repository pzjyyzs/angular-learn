import { Song, SongSheet } from "./data-types";


export interface Signin {
  code: number;
  point?: number;
  msg?: string;
}


export interface RecordVal {
  playCount: number;
  score: number;
  song: Song;
}

type recordKeys = 'weekData' | 'allData';

export type UserRecord = {
  [key in recordKeys]: RecordVal[];
};

export interface UserSheet {
  self: SongSheet[];
  subscribed: SongSheet[];
}

export interface LoginParams {
  phone: string;
  captcha: string;
  realIP: string;
}

export interface SampleBack extends AnyJson {
  code: number;
}

export interface AnyJson {
  [key: string]: any;
}
