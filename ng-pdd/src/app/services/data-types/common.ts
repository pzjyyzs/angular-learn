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

export interface Ad {
  imageUrl: string;
  link: string;
}

export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  tabs: string[];
  price: number;
  priceDesc: string;
  buyerAvatars: string[];
}
