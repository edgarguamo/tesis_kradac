import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Session } from 'src/app/models/session.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private currentUser: User;
	private session: Session;

	constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.currentUser = this.getUser();
		this.session = this.storageService.getCurrentSession();
	}

	getUser(): User {
		return this.storageService.getCurrentUser();
	}

	isLogged(): boolean {
		return this.storageService.isAuthenticated();
	}

	logout(): void {
		this.authService.logout(this.session.token).subscribe(
			response => {
				if (response && response.status === 'ok') {
					this.storageService.logout();
					this.router.navigateByUrl('/');
				}
			}
		);
	}

}
