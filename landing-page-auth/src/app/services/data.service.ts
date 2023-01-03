import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsuariosComentarios } from '../models/usuarios-comentarios.model';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	// Define API
	apiURL = environment.apiUrl + 'usuarios_comentarios';

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

	getUsuariosComentariosAll(): Observable<UsuariosComentarios[]> {
		return this.http.get<UsuariosComentarios[]>(this.apiURL)
		.pipe(
			retry(1),
			catchError(this.handleError)
		);
	}

	getUsuarioComentarioItem(idRegistro: number): Observable<UsuariosComentarios> {
		return this.http.get<UsuariosComentarios>(this.apiURL + '/' + idRegistro)
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
			// errores http del cliente
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
