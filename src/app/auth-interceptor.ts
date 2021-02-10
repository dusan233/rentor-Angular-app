import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        const modifiedRequest = req.clone({setHeaders: {
            'x-rapidapi-key': '2532d7c860mshce641c0cbfd7b81p1604aejsnf878c3d09546',
            'x-rapidapi-host': 'realtor.p.rapidapi.com'
        }})
        return next.handle(modifiedRequest);
    }
}