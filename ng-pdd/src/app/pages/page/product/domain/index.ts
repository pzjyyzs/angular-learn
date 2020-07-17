import { NumberValueAccessor } from '@angular/forms';
import { Product, ImageSlider } from 'src/app/services/data-types/common';

export interface ProductVariant {
  id: number;
  product: Product;
  name: string;
  price: number;
  listPrice: number;
  productVariantsImages: ImageSlider[];
}
