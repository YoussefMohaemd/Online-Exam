import { HttpInterceptorFn } from '@angular/common/http';

export const headerinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  req =req.clone({
    setHeaders:{
     token:localStorage.getItem('userToken') || '' }
 

  })
  return next(req);
};
