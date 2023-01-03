import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private localStorageService: Storage;
	private currentSession: Session = null;

	constructor(private router: Router) {
		this.localStorageService = localStorage;
		this.currentSession = this.loadSessionData();
	}

	setCurrentSession(session: Session): void {
		this.currentSession = session;
		this.localStorageService.setItem('currentUser', JSON.stringify(session));
	}

	loadSessionData(): Session {
		const sessionStr = this.localStorageService.getItem('currentUser');
		console.log(sessionStr);
		return (sessionStr) ? JSON.parse(sessionStr) as Session : null;
	}

	getCurrentSession(): Session {
		return this.currentSession;
	}

	removeCurrentSession(): void {
		this.localStorageService.removeItem('currentUser');
		this.currentSession = null;
	}

	getCurrentUser(): User {
		const session: Session = this.getCurrentSession();
		return (session && session.usuario) ? session.usuario : null;
	}

	isAuthenticated(): boolean {
		return (this.getCurrentToken() != null) ? true : false;
	}

	getCurrentToken(): string {
		const session: Session = this.getCurrentSession();
		return (session && session.token) ? session.token : null;
	}

	logout(): void {
		this.removeCurrentSession();
		// this.router.navigate(['/login']);
	}
}
