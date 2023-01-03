import { Component, Input, OnInit } from '@angular/core';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-grafica',
	templateUrl: './grafica.component.html',
	styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

	// Aqui se guardan los datos obtenidos del backEnd.
	// Desde este array puede manipularlos para los graficos
	private listDataset: UsuariosComentarios[] = [];

	@Input('idx') numGrafico: number;
	@Input() titleChart: string;

	chartData = [
		{
			data: [330, 600, 260, 700],
			label: 'Account A'
		},
		{
			data: [120, 455, 100, 340],
			label: 'Account B'
		},
		{
			data: [45, 67, 800, 500],
			label: 'Account C'
		}
	];

	chartLabels = [
		'January',
		'February',
		'March',
		'April'
	];

	chartOptions = {
		responsive: true
	};

	constructor(private storageService: StorageService, private dataService: DataService) { }

	ngOnInit(): void {
		if (this.isLogged()) {
			this.dataService.getUsuariosComentariosAll().subscribe(
				data => this.setListDataset(data)
			);
		}
	}

	private setListDataset(data: UsuariosComentarios[]): void {
		this.listDataset = data;
		console.log(this.listDataset);
	}

	isLogged(): boolean {
		return this.storageService.isAuthenticated();
	}

}
