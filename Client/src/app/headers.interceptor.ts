import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonServiceService } from './common-service.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      
      request = request.clone({
        
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
    }
    return next.handle(request)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMsg=''
        if(error.status===0){
          errorMsg=`*********${error.status} : ${error.message}*********`
          console.log(errorMsg);
          
        }
        else{
          
            console.log(error.status,error.message);
            
          
        }
        return throwError(()=>error)
    }))
  }
}
