import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private storageService: StorageService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.storageService.getCurrentToken();

		if (token) {
			const newRequest = req.clone({
				headers: req.headers.set('x-access-token', token)
			});
			return next.handle(newRequest);
		}
		else {
			return next.handle(req);
		}
	}
}
