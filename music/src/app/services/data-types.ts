export enum CommentType {
  Song = 0,
  MV,
  Sheet,
  Album,
  DjShow,
  Video,
  Post,
  DJ
}

export interface Banner {
  url: string;
  imageUrl: string;
  typeTitle: string;
  titleColor: string;
}

export interface SongSheet {
  name: string;
  id: number;
  playCount: number;
  picUrl: string;
}

export interface Singer {
  id: number;
  name: string;
  alias: string[];
  picUrl: string;
  albumSize: number;
}

export interface Dj {
  id: number;
  nickName: string;
  avatarUrl: string;
}

export interface Song {
  id: number;
  name: string;
  url: string;
  ar: Singer[];
  al: { id: number; name: string; picUrl: string, pic_str: string };
  dt: number;
}

export interface SongUrl {
  id: number;
  url: string;
}

export interface PlayMode {
  type: 'loop' | 'random' | 'singleLoop';
  label: '循环' | '随机' | '单曲循环';
}

export interface Lyric {
  lyric: string;
  tlyric: string;
}

export interface User {
  nickname: string;
  userId: number;
  avatarUrl: string;
}

export interface Replied {
  beRepliedCommentId: number;
  content: string;
  user: User;
}

export interface Comment {
  commentId: number;
  content: string;
  timeStr: string;
  user: User;
  needDisplayTime: boolean;
  likedCount: number;
  liked: boolean;
  beReplied: Array<Replied>;
}
