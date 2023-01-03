import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from 'src/app/models/login-object.model';
import { Session } from 'src/app/models/session.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	errorMessage: string;

	constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
			password: ['', Validators.required]
		});
	}

	submit(email: string, password: string): boolean {
		this.errorMessage = null;
		if (this.loginForm.valid) {
			const objLogin = new LoginObject(email, password);
			this.authService.login(objLogin).subscribe(
				response => this.initLogin(response.data),
				error => (this.errorMessage = error));
		}
		return false;
	}

	private initLogin(data: Session): void {
		this.storageService.setCurrentSession(data);
		this.router.navigate(['/home']);
	}

	isLogged(): boolean {
		return this.storageService.isAuthenticated();
	}

}
