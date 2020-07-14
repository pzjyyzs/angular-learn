export interface TopMenu {
  title: string;
  link?: string;
  id: number;
}

export interface ImageSlider {
  id: number;
  imgUrl: string;
  link: string;
  caption: string;
}

export interface TabItem {
  title: string;
  icon: string;
  link: string;
  selectedIcon: string;
}
