import { Injectable } from '@angular/core';
import { ServiceModule } from './service.module';
import { HttpClient } from '@angular/common/http';
import { Product } from './data-types/common';
import { ProductVariant } from '../pages/page/product/domain';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: ServiceModule
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getProductVariantsByProductId(productId: string): Observable<ProductVariant[]> {
    return this.http.get(`${environment.baseUrl}/productVariants`,
    { params: { _expand: 'product', _embed: 'productVariantImages', productId } })
    .pipe(map((res: ProductVariant[]) => res));
  }

}
