import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonInterceptorService } from './common-interceptor.service';

export default [
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptorService, multi: true}
];
