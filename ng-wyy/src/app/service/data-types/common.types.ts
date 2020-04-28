import { NumberValueAccessor } from '@angular/forms'

export type Banner = {
  targetId: number,
  url: string,
  imageUrl: string
}

export type HotTag = {
  id: number,
  name: string,
  position: number
}

// 歌单
export type SongSheet = {
  id: number;
  userId: number;
  name: string;
  picUrl: string;
  coverImgUrl: string;
  playCount: number;
  tags: string[];
  createTime: number;
  creator: { nickname: string;  avatarUrl: string; };
  description: string;
  subscribedCount: number;
  shareCount: number;
  commentCount: number;
  subscribed: boolean;
  tracks: Song[];
}

export type Singer = {
  id: number;
  name: string;
  alias: string[];
  picUrl: string;
  albumSize: number;
}

export type SingerDetail = {
  artist: Singer;
  hotSongs: Song[];
}

//歌曲
export type Song = {
  id: number;
  name: string;
  url: string;
  ar: Singer [];
  al: { id: number; name: string; picUrl: string };
  dt: number;
}

export type SongUrl = {
  id: number;
  url: string;
}

export interface Lyric {
  lyric: string;
  tlyric: string;
}

export interface SheetList {
  playlists: SongSheet[];
  total: NumberValueAccessor;
}

export interface SearchResult {
  artists?: Singer[];
  playlists?: SongSheet[];
  songs?: Song[];
}

export interface sampleBack {
  code: number;
  [key: string]: any;
}
