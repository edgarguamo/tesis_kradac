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
  fecha_final = '31 de Febrero del 2021';

  chartLabels = ['January', 'February', 'March', 'April'];
  chartOptions = {
    responsive: true,
    labels: this.chartLabels,
  };
  titleChart = 'Distribución de clientes en el mes de enero';
  // Inicio grafica 1
  positivo = '20';
  negativo = '40';
  neutral = '40';
  //Fin gráfica 1
  // Grafica 2
  valoracion_0 = '10';
  valoracion_1 = '15';
  valoracion_2 = '20';
  valoracion_3 = '25';
  valoracion_4 = '10';
  valoracion_5 = '10';
  sh = 1;
  //Fin gráfia 2
  total_comentarios = 11234;
  // elementos para la gráfica
  datos_grafica = [[], [], []];
  average_notes = '3.5';
  // Fin declaración de variables
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getUsuariosComentariosAll()
      .subscribe((data) => this.setListDataset(data));
  }

  ngOnSubmit(): void {
    this.tipoGrafica(this.userQuery.TipoGrafica);
    this.dataService
      .getUsuariosComentariosConsulta(
        this.userQuery.TipoConsulta,
        this.userQuery.FechaHoraRegistro,
        this.userQuery.FechaHoraFin
      )
      .subscribe((data) => this.setListDataset(data));
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
        this.chartType = 'doughnut';
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
    // Generación de valores para la gráficcas
    // Gráfica principal
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
    // Gráfica para las valoraciones y promedio
    let valorQuery = Object.entries(
      this.listDataset.reduce(
        (aux, d) => (
          aux[d.ValoracionClientes]
            ? (aux[d.ValoracionClientes] += 1)
            : (aux[d.ValoracionClientes] = 1),
          aux
        ),
        {}
      )
    );
    switch (this.chartType) {
      case 'bar':
        console.log('entra');
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
        break;
      case 'line':
        this.chartData = [
          {
            data: [0,defaultquery[0][1] as number],
            label: defaultquery[0][0],
          },
          {
            data: [0,defaultquery[1][1] as number],
            label: defaultquery[1][0],
          },
          {
            data: [0,defaultquery[2][1] as number],
            label: defaultquery[2][0],
          },
        ];
       break;
        case 'polar':
        this.chartData = [
          {
            data: [
              defaultquery[0][1] as number,
              defaultquery[1][1] as number,
              defaultquery[2][1] as number,
            ],
            label: defaultquery[0][0],
          },
        ];
        break;
      case 'doughnut':
        this.chartData = [
          {
            data: [
              defaultquery[0][1] as number,
              defaultquery[1][1] as number,
              defaultquery[2][1] as number,
            ],
            label: defaultquery[0][0],
          },
        ];
        break;
      default:
        this.chartType = 'bar';
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
        break;
    }

    this.chartLabels = [
      defaultquery[0][0],
      defaultquery[1][0],
      defaultquery[2][0],
    ];
    console.log (this.chartLabels);
    /* 
    Clasificación de los comentarios por tipo 
    */
    console.log(valorQuery);
    var total =
      (defaultquery[0][1] as number) +
      (defaultquery[1][1] as number) +
      (defaultquery[2][1] as number);
    this.negativo = (((defaultquery[0][1] as number) * 100) / total).toFixed(2);
    this.neutral = (((defaultquery[1][1] as number) * 100) / total).toFixed(2);
    this.positivo = (((defaultquery[2][1] as number) * 100) / total).toFixed(2);

    var total_calificacion =
      (valorQuery[1][1] as number) +
      (valorQuery[2][1] as number) +
      (valorQuery[3][1] as number) +
      (valorQuery[4][1] as number) +
      (valorQuery[5][1] as number);
    this.total_comentarios = total;

    /* 
      
      Media de calificaciones
      */
    this.average_notes = (
      ((valorQuery[1][1] as number) * 1 +
        (valorQuery[2][1] as number) * 2 +
        (valorQuery[3][1] as number) * 3 +
        (valorQuery[4][1] as number) * 4 +
        (valorQuery[5][1] as number) * 5) /
      total_calificacion
    ).toFixed(2);

    /*
       Valoración de los usuarios 
      */
    console.log(this.average_notes);
    this.valoracion_0 = (
      ((valorQuery[0][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);
    this.valoracion_1 = (
      ((valorQuery[1][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);
    this.valoracion_2 = (
      ((valorQuery[2][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);
    this.valoracion_3 = (
      ((valorQuery[3][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);
    //this.valoracion_3 = '12.3';
    this.valoracion_4 = (
      ((valorQuery[4][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);
    this.valoracion_5 = (
      ((valorQuery[5][1] as number) * 100) /
      total_calificacion
    ).toFixed(2);

    /*
     Elemmentos para la gráfica
    */
    console.log(defaultquery);
    console.log(total);

    this.datos_grafica = [
      [defaultquery[0][1] as number],
      [defaultquery[1][1] as number],
      [defaultquery[2][1] as number],
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

  //Obtener el título  para las gráficas

  private titleGraph(fechaInicial: string, fechaFinal: string): void {
    console.log(fechaInicial.substring(5, 7));
    var mes_inicial = new Intl.DateTimeFormat('es-ES', {
      month: 'long',
    }).format(new Date().setMonth(parseInt(fechaInicial.substring(5, 7)) - 1));
    var mes_final = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
      new Date().setMonth(parseInt(fechaFinal.substring(5, 7)) - 1)
    );
    this.fecha_inical = `${fechaInicial.substring(
      8,
      10
    )} de ${mes_inicial} del ${fechaInicial.substring(0, 4)}`;
    this.fecha_final = `${fechaFinal.substring(
      8,
      10
    )} de ${mes_final} del ${fechaFinal.substring(0, 4)}`;
  }
}
