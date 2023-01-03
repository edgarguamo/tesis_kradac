import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { Response } from '../models/response.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginObject } from '../models/login-object.model';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// Define API
	apiURL = environment.apiUrl + 'auth';

	constructor(private http: HttpClient) { }

	/*========================================
	  CRUD Methods for consuming RESTful API
	=========================================*/

	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	login(objLogin: LoginObject): Observable<Response> {
		return this.http.post<Response>(this.apiURL + '/login', objLogin, this.httpOptions)
		.pipe(
			retry(1),
			catchError(this.handleError)
		);
	}

	logout(token: string): Observable<Response> {
		return this.http.post<Response>(this.apiURL + '/logout', { token }, this.httpOptions)
		.pipe(
			retry(1),
			catchError(this.handleError)
		);
	}

	// Error handling
	handleError(error: any): Observable<never> {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		}
		else if (error.error != null && (error.status >= 400 && error.status < 500)) {
			errorMessage = error.error.message;
		}
		else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			window.alert(errorMessage);
		}
		return throwError(errorMessage);
	}

}
