import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent {
  formGroup = new FormGroup({
    label: new FormControl(''),
    value: new FormControl(''),
  });

  submitForm() {
    const data = this.formGroup.value;
    this.updateChart(data);
  }
  updateChart(data) {}
  // Aqui se guardan los datos obtenidos del backEnd.
  // Desde este array puede manipularlos para los graficos
  private listDataset: UsuariosComentarios[] = [];

  @Input('idx') numGrafico: number;
  //@Input() titleChart: string;
  userQuery = new UsuariosComentarios();
  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Clientes',
    },
    {
      data: [120, 455, 100, 340],
      label: 'Conductores',
    },
  ];
  chartType = 'bar';
  fecha_inical = '1 de Enero del 2021';
  fecha_final = '2 de Enero del 2021';

  chartLabels = ['January', 'February', 'March', 'April'];

  chartOptions = {
    responsive: true,
  };
  titleChart = 'Distribución de clientes en el mes de enero';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getUsuariosComentariosAll()
      .subscribe((data) => this.setListDataset(data));
  }

  ngOnSubmit(): void {
    this.dataService
      .getUsuariosComentariosConsulta(
        this.userQuery.TipoConsulta,
        this.userQuery.FechaHoraRegistro,
        this.userQuery.FechaHoraFin
      )
      .subscribe((data) => this.setListDataset(data));
    this.tipoGrafica(this.userQuery.TipoConsulta);
    console.log('El formulario fue enviado y los datos son: ', this.userQuery);
  }
  private tipoGrafica(seleccion: string): void {
    switch (seleccion) {
      case '1':
        this.chartType = 'bar';
        break;
      case '2':
        this.chartType = 'line';
        break;
      case '3':
        this.chartType = 'polarArea';
        break;
      case '4':
        this.chartType = 'scatter';
        break;
      default:
        this.chartType = 'bar';
    }
  }

  public setDataChart(newChartData: [], newChartLabels: []): void {
    this.chartData = newChartData;
    this.chartLabels = newChartLabels;
  }

  private setListDataset(data: UsuariosComentarios[]): void {
    this.listDataset = data;
    let defaultquery = Object.entries(
      this.listDataset.reduce(
        (aux, d) => (
          aux[d.CalificacionChoferes]
            ? (aux[d.CalificacionChoferes] += 1)
            : (aux[d.CalificacionChoferes] = 1),
          aux
        ),
        {}
      )
    );
    console.log(defaultquery);

    this.chartData = [
      {
        data: [defaultquery[0][1] as number],
        label: defaultquery[0][0],
      },
      {
        data: [defaultquery[1][1] as number],
        label: defaultquery[1][0],
      },
      {
        data: [defaultquery[2][1] as number],
        label: defaultquery[2][0],
      },
    ];
    if (
      (this.userQuery.FechaHoraRegistro !== undefined,
      this.userQuery.FechaHoraFin !== undefined)
    ) {
      this.titleGraph(
        this.userQuery.FechaHoraRegistro,
        this.userQuery.FechaHoraFin
      );
    }
    if (this.userQuery.FechaHoraFin === undefined) {
      this.titleChart = `Percepción de comentarios de clientes del \n ${this.fecha_inical} al ${this.fecha_final}`;
    } else {
      if (this.userQuery.TipoConsulta === '3') {
        this.titleChart = `Percepción de comentarios de Clientes del \n ${this.fecha_inical} al ${this.fecha_final}`;
      } else {
        this.titleChart = `Percepción de comentarios de Choferes ${this.userQuery.FechaHoraRegistro} al ${this.userQuery.FechaHoraFin}`;
      }
    }
  }
  private titleGraph(fechaInicial: string, fechaFinal: string): void {
    console.log(fechaInicial.substring(5, 7));
    var mes_inicial   = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date().setMonth(parseInt(fechaInicial.substring(5, 7))-1));
    var mes_final   = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date().setMonth(parseInt(fechaFinal.substring(5, 7))-1));
    this.fecha_inical = `${fechaInicial.substring(8, 10)} de ${mes_inicial} del ${fechaInicial.substring(0, 4)}`
    this.fecha_final = `${fechaFinal.substring(8, 10)} de ${mes_final} del ${fechaFinal.substring(0, 4)}`
  }
}
