import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	listTitles: string[] = [
		'Estado del Aplicativo',
		'Categorización',
		'Varios'
	];

	constructor() { }

	ngOnInit(): void {
	}

}
