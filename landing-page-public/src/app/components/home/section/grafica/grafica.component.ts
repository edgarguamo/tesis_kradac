import { isNgTemplate } from '@angular/compiler';
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
	//@Input() titleChart: string;

	chartData = [
		{
			data: [330, 600, 260, 700],
			label: 'Clientes'
		},
		{
			data: [120, 455, 100, 340],
			label: 'Conductores'
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
	titleChart = 'Distribución de clientes en el mes de enero'
	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.dataService.getUsuariosComentariosAll().subscribe(
			data => this.setListDataset(data)
		);
	}
	private setListDataset(data: UsuariosComentarios[]): void {
		this.listDataset = data;
		/*
		console.log(this.listDataset[1].CalificacionChoferes);
		var valores = this.listDataset.filter(function(data){
			return data.CalificacionChoferes === 'Negativo';
		}).map(function(data){
			return data.CalificacionChoferes;
		})
		var cali = this.listDataset.map(function(data){
			return data.CalificacionChoferes;
		})
		*/
		let defaultquery = Object.entries(this.listDataset.reduce((aux, d) => (aux[d.CalificacionChoferes] ? aux[d.CalificacionChoferes] += 1: aux[d.CalificacionChoferes] =1,aux), {}));
		console.log(defaultquery[0][1]);
		console.log(typeof(defaultquery[0][1]));
		
		this.chartData = [
			{
				data: [defaultquery[0][1] as number],
				label: defaultquery[0][0]
			},
			{
				data: [defaultquery[1][1] as number],
				label: defaultquery[1][0]
			},
			{
				data: [defaultquery[2][1] as number],
				label: defaultquery[2][0]
			}
		];
		this.chartLabels = [
			defaultquery[0][0],
			defaultquery[1][0],
			defaultquery[2][0]
		];
		this.titleChart = 'Percepción de comentarios en el mes de Enero 2021'
	}

}
