import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        const modifiedRequest = req.clone({setHeaders: {
            'x-rapidapi-key': 'c3bc46cd6cmshc2c40961c390349p153bcfjsn226b0adaa42b',
            'x-rapidapi-host': 'realtor.p.rapidapi.com'
        }})
        return next.handle(modifiedRequest);
    }
}