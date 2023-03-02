import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';
//import * as labels from "chartjs-plugin-labels";
import 'chartjs-plugin-labels';
import 'chartjs-plugin-colorschemes';

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
  /*
    Inicio Variables
  */
  private listDataset: UsuariosComentarios[] = [];

  @Input('idx') numGrafico: number;
  //@Input() titleChart: string;
  userQuery = new UsuariosComentarios();
  colorsChart = [
    'rgba(204, 36, 29 , 1)',
    'rgba(254, 128, 25, 1)',
    'rgba(250, 189, 47, 1)',
    'rgba(235, 219, 178,1)',
    'rgba(184, 187, 38, 1)',
    'rgba(152, 151, 26, 1)',
  ];
  chartData = [
    {
      data: [330, 600, 260, 700],
      label: ['Negativo '],
      backgroundColor: [this.colorsChart[0]],
    },
    {
      data: [250, 455, 100, 340],
      label: ['Neutral'],
      backgroundColor: [this.colorsChart[2]],
    },
    {
      data: [170, 455, 100, 340],
      label: ['Positivo'],
      backgroundColor: [this.colorsChart[4]],
    },
  ];
  chartType = 'bar';
  fecha_inical = '1 de Enero del 2021';
  fecha_final = '31 de Enero del 2021';

  chartLabels = ['Negativo', 'Positivo', 'Neutral'];
  // opciones para generar la gráfica
  chartColors = [
    {
      backgroundColor: [
        'rgba(204, 36, 29, 1)',
        'rgba(254, 128, 25, 1)',
        'rgba(250, 189, 47, 1)',
        'rgba(235, 219, 178, 1)',
        'rgba(184, 187, 38, 1)',
        'rgba(152, 151, 26, 1)',
      ],
    },
    { backgroundColor: 'rgba(254, 128, 25, 1)' },
    { backgroundColor: 'rgba(250, 189, 47, 1)' },
    { backgroundColor: 'rgba(235, 219, 178, 1)' },
    { backgroundColor: 'rgba(184, 187, 38, 1)' },
    { backgroundColor: 'rgba(152, 151, 26, 1)' },
  ];

  chartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 22,
      },
    },
    pieceLabel: {
      render: function (args) {
        const label = args.label,
          value = args.value;
        return label + value;
      },
      plugins: {
        colorschemes: {
          scheme: 'brewer.Paired12',
        },
      },
    },
    defaultFontSize: 30,
    fontColor: '#2b2b2b',
  };

  titleChart = 'Distribución de clientes en el mes de enero';
  // Inicio grafica 1
  positivo = '20';
  negativo = '40';
  neutral = '40';
  positivo_conductor = '40';
  negativo_conductor = '20';
  neutro_conductor = '40';
  //Fin gráfica 1
  // Grafica 2
  valoracion_0 = '10';
  valoracion_1 = '15';
  valoracion_2 = '20';
  valoracion_3 = '25';
  valoracion_4 = '10';
  valoracion_5 = '10';

  valoracion_0c = '10';
  valoracion_1c = '15';
  valoracion_2c = '20';
  valoracion_3c = '25';
  valoracion_4c = '10';
  valoracion_5c = '10';

  sh = 1;
  //Fin gráfia 2
  total_comentarios = 750;
  // elementos para la gráfica
  datos_grafica = [[], [], []];
  average_notes = '3.5';
  average_notes_conductor = '2.2';
  /*
    Fin Variables
  */
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
    let valorConductorQuery = Object.entries(
      this.listDataset.reduce(
        (aux, d) => (
          aux[d.ValoracionChoferes]
            ? (aux[d.ValoracionChoferes] += 1)
            : (aux[d.ValoracionChoferes] = 1),
          aux
        ),
        {}
      )
    );
    let ClientesQuery = Object.entries(
      this.listDataset.reduce(
        (aux, d) => (
          aux[d.CalificacionClientes]
            ? (aux[d.CalificacionClientes] += 1)
            : (aux[d.CalificacionClientes] = 1),
          aux
        ),
        {}
      )
    );
    console.log(this.listDataset);

    if (this.userQuery.TipoConsulta === '3') {
      switch (this.chartType) {
        case 'bar':
          this.chartData = [
            {
              data: [defaultquery[0][1] as number],
              label: [defaultquery[0][0]],
              backgroundColor: [this.colorsChart[0]],
            },
            {
              data: [defaultquery[1][1] as number],
              label: [defaultquery[1][0]],
              backgroundColor: [this.colorsChart[2]],
            },
            {
              data: [defaultquery[2][1] as number],
              label: [defaultquery[2][0]],
              backgroundColor: [this.colorsChart[4]],
            },
          ];
          this.chartLabels = [`${this.fecha_inical} - ${this.fecha_final}`];
          break;
        case 'line':
          this.chartData = [
            {
              data: [0, defaultquery[0][1] as number],
              label: [defaultquery[0][0]],
              backgroundColor: [this.colorsChart[0]],
            },
            {
              data: [0, defaultquery[1][1] as number],
              label: [defaultquery[1][0]],
              backgroundColor: [this.colorsChart[2]],
            },
            {
              data: [0, defaultquery[2][1] as number],
              label: [defaultquery[2][0]],
              backgroundColor: [this.colorsChart[4]],
            },
          ];
          this.chartLabels = [
            defaultquery[0][0],
            defaultquery[1][0],
            defaultquery[2][0],
          ];
          break;
        default:
          this.chartData = [
            {
              data: [
                defaultquery[1][1] as number,
                defaultquery[0][1] as number,
                defaultquery[2][1] as number,
              ],
              label: [
                defaultquery[0][0],
                defaultquery[1][0],
                defaultquery[2][0],
              ],
              backgroundColor: [
                'rgba(254, 128, 25, 1)',
                'rgba(250, 189, 47, 1)',
                'rgba(184, 187, 38, 1)',
              ],
            },
          ];
          this.chartLabels = [
            defaultquery[0][0],
            defaultquery[1][0],
            defaultquery[2][0],
          ];

          break;
      }
    } else {
      switch (this.chartType) {
        case 'bar':
          this.chartData = [
            {
              data: [valorQuery[0][1] as number],
              label: [valorQuery[0][0]],
              backgroundColor: [this.colorsChart[0]],
            },
            {
              data: [valorQuery[1][1] as number],
              label: [valorQuery[1][0]],
              backgroundColor: [this.colorsChart[1]],
            },
            {
              data: [valorQuery[2][1] as number],
              label: [valorQuery[2][0]],
              backgroundColor: [this.colorsChart[2]],
            },
            {
              data: [valorQuery[3][1] as number],
              label: [valorQuery[3][0]],
              backgroundColor: [this.colorsChart[3]],
            },
            {
              data: [valorQuery[4][1] as number],
              label: [valorQuery[4][0]],
              backgroundColor: [this.colorsChart[4]],
            },
            {
              data: [valorQuery[5][1] as number],
              label: [valorQuery[5][0]],
              backgroundColor: [this.colorsChart[5]],
            },
          ];
          this.chartLabels = [`${this.fecha_inical} - ${this.fecha_final}`];
          break;
        case 'line':
          this.chartData = [
            {
              data: [0, valorQuery[0][1] as number],
              label: [valorQuery[0][0]],
              backgroundColor: [this.colorsChart[0]],
            },
            {
              data: [0, valorQuery[1][1] as number],
              label: [valorQuery[1][0]],
              backgroundColor: [this.colorsChart[1]],
            },
            {
              data: [0, valorQuery[2][1] as number],
              label: [valorQuery[2][0]],
              backgroundColor: [this.colorsChart[2]],
            },
            {
              data: [0, valorQuery[3][1] as number],
              label: [valorQuery[3][0]],
              backgroundColor: [this.colorsChart[3]],
            },
            {
              data: [0, valorQuery[4][1] as number],
              label: [valorQuery[4][0]],
              backgroundColor: [this.colorsChart[4]],
            },
            {
              data: [0, valorQuery[5][1] as number],
              label: [valorQuery[5][0]],
              backgroundColor: [this.colorsChart[5]],
            },
          ];
          this.chartLabels = [
            valorQuery[0][0],
            valorQuery[1][0],
            valorQuery[2][0],
            valorQuery[3][0],
            valorQuery[4][0],
            valorQuery[5][0],
          ];
          break;
        default:
          this.chartData = [
            {
              data: [
                valorQuery[1][1] as number,
                valorQuery[0][1] as number,
                valorQuery[2][1] as number,
                valorQuery[3][1] as number,
                valorQuery[4][1] as number,
                valorQuery[5][1] as number,
              ],
              label: [
                valorQuery[0][0],
                valorQuery[1][0],
                valorQuery[2][0],
                valorQuery[3][0],
                valorQuery[4][0],
                valorQuery[5][0],
              ],
              backgroundColor: [
                this.colorsChart[0],
                this.colorsChart[1],
                this.colorsChart[2],
                this.colorsChart[3],
                this.colorsChart[4],
                this.colorsChart[5],
              ],
            },
          ];
          this.chartLabels = [
            valorQuery[0][0],
            valorQuery[1][0],
            valorQuery[2][0],
            valorQuery[3][0],
            valorQuery[4][0],
            valorQuery[5][0],
          ];
          break;
      }
    }
    console.log(this.chartLabels);
    /* 
    Clasificación de los comentarios por tipo 
    */
    console.log(valorQuery);
    var total =
      (defaultquery[0][1] as number) +
      (defaultquery[1][1] as number) +
      (defaultquery[2][1] as number);
    this.negativo_conductor = (
      ((defaultquery[0][1] as number) * 100) /
      total
    ).toFixed(2);
    this.neutro_conductor = (
      ((defaultquery[1][1] as number) * 100) /
      total
    ).toFixed(2);
    this.positivo_conductor = (
      ((defaultquery[2][1] as number) * 100) /
      total
    ).toFixed(2);

    var total_cliente =
      (ClientesQuery[0][1] as number) +
      (ClientesQuery[1][1] as number) +
      (ClientesQuery[2][1] as number);
    this.negativo = (
      ((ClientesQuery[0][1] as number) * 100) /
      total_cliente
    ).toFixed(2);
    this.neutral = (
      ((ClientesQuery[1][1] as number) * 100) /
      total_cliente
    ).toFixed(2);
    this.positivo = (
      ((ClientesQuery[2][1] as number) * 100) /
      total_cliente
    ).toFixed(2);

    /* 
      
      Media de calificaciones
      */

    var total_calificacion =
      (valorQuery[1][1] as number) +
      (valorQuery[2][1] as number) +
      (valorQuery[3][1] as number) +
      (valorQuery[4][1] as number) +
      (valorQuery[5][1] as number);
      console.log(total_calificacion);
    this.total_comentarios = total;

    this.average_notes = (
      ((valorQuery[1][1] as number) * 1 +
        (valorQuery[2][1] as number) * 2 +
        (valorQuery[3][1] as number) * 3 +
        (valorQuery[4][1] as number) * 4 +
        (valorQuery[5][1] as number) * 5) /
      total_calificacion
    ).toFixed(2);

    var total_calificacion_c =
      (valorConductorQuery[1][1] as number) +
      (valorConductorQuery[2][1] as number) +
      (valorConductorQuery[3][1] as number) +
      (valorConductorQuery[4][1] as number) +
      (valorConductorQuery[5][1] as number);

    this.average_notes_conductor = (
      ((valorConductorQuery[1][1] as number) * 1 +
        (valorConductorQuery[2][1] as number) * 2 +
        (valorConductorQuery[3][1] as number) * 3 +
        (valorConductorQuery[4][1] as number) * 4 +
        (valorConductorQuery[5][1] as number) * 5) /
      total_calificacion_c
    ).toFixed(2);
    console.log(this.average_notes_conductor);

    /*
       Valoración de los usuarios 
      */
    this.valoracion_0c = (
      ((valorConductorQuery[0][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_1c= (
      ((valorConductorQuery[1][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_2c = (
      ((valorConductorQuery[2][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_3c = (
      ((valorConductorQuery[3][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    //this.valoracion_3 = '12.3';
    this.valoracion_4c = (
      ((valorConductorQuery[4][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_5c = (
      ((valorConductorQuery[5][1] as number) * 100) /
      this.total_comentarios
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
  /*
    Obtener el título  para las gráficas
  */
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
