import { Component, Input, OnInit } from '@angular/core';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';

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
			data: [800, 600, 520, 750],
			label: 'Negativo'
		},
		{
			data: [550, 600, 720, 580],
			label: 'Neutral'
		},
		{
			data: [250, 300, 400, 200],
			label: 'Positivo'
		}
	];

	chartLabels = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abríl'
	];

	chartOptions = {
		responsive: true
	};

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.dataService.getUsuariosComentariosAll().subscribe(
			data => this.setListDataset(data)
		);
	}

	private setListDataset(data: UsuariosComentarios[]): void {
		this.listDataset = data;
		console.log('Esto es una impresion');
		console.log(this.listDataset);
	}

}
