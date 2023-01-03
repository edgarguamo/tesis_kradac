import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	listTitles: string[] = [
		'Grafica 1',
		'Grafica 2',
		'Grafica 3'
	];

	constructor() { }

	ngOnInit(): void {
	}

}
