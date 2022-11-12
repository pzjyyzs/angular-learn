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
