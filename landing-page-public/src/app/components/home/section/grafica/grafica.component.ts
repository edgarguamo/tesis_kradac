import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';
//import * as labels from "chartjs-plugin-labels";
import 'chartjs-plugin-labels';
import 'chartjs-plugin-colorschemes';
import {
  colorscheme1,
  default_data_graph,
  graph_colors,
} from './defaultdata.component';
import './text.component';
import {
  listDataGraphs,
  get_title_chart,
  listDataGraphs5,
} from './dataStructures.component';
import { percepcion } from './percepcion.component';

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
  colorsChart = colorscheme1;
  chartData = default_data_graph;
  testchartData = default_data_graph;
  chartType = 'polarArea';
  fecha_inical = '2021-01-01';
  fecha_final = '2021-01-31';
  chartLabels = ['Negativo', 'Positivo', 'Neutral'];
  // opciones para generar la gráfica
  chartColors = graph_colors;

  chartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 22,
        fontStyle: 'bold',
        TextMargin: 10,
      },
    },
    pieceLabel: {
      render: function (args) {
        const label = args.label,
          value = args.value;
        return label + value;
      },
    },
    defaultFontSize: 30,
    TextMargin: 10,
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
  //Podium
  podium1 = '40';
  podium2 = '20';
  podium3 = '34';
  podium4 = '21';
  podium5 = '22';
  conductor1 = '12334';
  conductor2 = '24';
  conductor3 = '6784';
  conductor4 = '84';
  conductor5 = '954';
  numConductor = '1206';

  /*
  Generación de reportes 
  */
  reportes_principal = '';
  reportes_percepcion_usuario = '';
  reportes_percepcion_conductor = '';
  reporte_promedio = '';
  reporte_valoracion = '';
  reporte_conductores = '';
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

  public setListDataset(data: UsuariosComentarios[]): void {
    this.listDataset = data;
    // Generación de valores para la gráficcas
    // Gráfica principal

    console.log('consulas');
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

    let conductores = Object.entries(
      this.listDataset.reduce(
        (aux, d) => (
          aux[d.IdUsuarioAtendio]
            ? (aux[d.IdUsuarioAtendio] += 1)
            : (aux[d.IdUsuarioAtendio] = 1),
          aux
        ),
        {}
      )
    );
    /*
    podio
    */
    let podium_data = conductores
      .sort(function (a, b) {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] < b[1]) {
          return 1;
        }
        return 0;
      })
      .slice(0, 5);

    // Gr
    this.numConductor = conductores.length.toString();
    console.log('distribuir datos para las gráficas ');
    this.podium1 = podium_data[0][1] as string;
    this.podium2 = podium_data[1][1] as string;
    this.podium3 = podium_data[2][1] as string;
    this.podium4 = podium_data[3][1] as string;
    this.podium5 = podium_data[4][1] as string;

    this.conductor1 = podium_data[0][0];
    this.conductor2 = podium_data[1][0];
    this.conductor3 = podium_data[2][0];
    this.conductor4 = podium_data[3][0];
    this.conductor5 = podium_data[4][0];

    /*
      Primera gŕafica
    */
    console.log('prueba');
    switch (this.userQuery.TipoConsulta) {
      case '1':
        console.log(this.chartType);
        if (this.chartType !== 'line') {
          this.chartData = listDataGraphs(
            'conductor',
            this.chartType,
            defaultquery,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        } else {
          this.chartData = listDataGraphs(
            'conductor',
            this.chartType,
            this.listDataset,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        }
        this.chartLabels = get_title_chart();
        break;
      case '2':
        if (this.chartType !== 'line') {
          this.chartData = listDataGraphs(
            'cliente',
            this.chartType,
            ClientesQuery,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        } else {
          this.chartData = listDataGraphs(
            'cliente',
            this.chartType,
            this.listDataset,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        }
        this.chartLabels = get_title_chart();
        break;
      case '3':
        if (this.chartType !== 'line') {
          this.chartData = listDataGraphs(
            'cliente',
            this.chartType,
            valorQuery,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        } else {
          this.chartData = listDataGraphs5(
            'cliente',
            this.listDataset,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        }
        this.chartLabels = get_title_chart();
        break;
      case '4':
        if (this.chartType !== 'line') {
          this.chartData = listDataGraphs(
            'conductor',
            this.chartType,
            valorConductorQuery,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        } else {
          this.chartData = listDataGraphs5(
            'cliente',
            this.listDataset,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        }
        this.chartLabels = get_title_chart();
        break;
      default:
        console.log('por defecto');
        if (this.chartType !== 'line') {
          this.chartData = listDataGraphs(
            'cliente',
            this.chartType,
            defaultquery,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        } else {
          this.chartData = listDataGraphs5(
            'cliente',
            this.listDataset,
            this.userQuery.FechaHoraRegistro,
            this.userQuery.FechaHoraFin
          );
        }
        console.log(this.chartData);
        this.chartLabels = get_title_chart();
    }
    //intervalo.setDate(intervalo.getDate() - new Date(this.fecha_inical.substring(0,10)).getDate());
    /* 
    Clasificación de los comentarios por tipo 
    */
    console.log(percepcion(defaultquery));
    this.total_comentarios =
      (defaultquery[0][1] as number) +
      (defaultquery[1][1] as number) +
      (defaultquery[2][1] as number);

    let percepcion_data = percepcion(defaultquery);
    for (let i = 0; i < percepcion_data.length; i++) {
      if (percepcion_data[i][0] === 'Negativo') {
        this.negativo_conductor = percepcion_data[i][1];
      } else if (percepcion_data[i][0] === 'Neutral') {
        this.neutro_conductor = percepcion_data[i][1];
      } else {
        this.positivo_conductor = percepcion_data[i][1];
      }
    }

    if (this.negativo_conductor === '20') {
      this.negativo_conductor = '0';
    }
    if (this.neutro_conductor === '40') {
      this.neutro_conductor = '0';
    }
    if (this.positivo_conductor === '40') {
      this.negativo_conductor = '0';
    }

    let percepcion_cliente = percepcion(ClientesQuery);
    for (let i = 0; i < percepcion_cliente.length; i++) {
      if (percepcion_cliente[i][0] === 'Negativo') {
        this.negativo = percepcion_cliente[i][1];
      } else if (percepcion_cliente[i][0] === 'Neutral') {
        this.neutral = percepcion_cliente[i][1];
      } else {
        this.positivo = percepcion_cliente[i][1];
      }
    }

    if (this.negativo === '40') {
      this.negativo = '0';
    }
    if (this.neutral === '40') {
      this.neutral = '0';
    }
    if (this.positivo === '20') {
      this.negativo = '0';
    }

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
    Valoracion Cliente
    */
    this.valoracion_0 = (
      ((valorQuery[0][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_1 = (
      ((valorQuery[1][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_2 = (
      ((valorQuery[2][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_3 = (
      ((valorQuery[3][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    //this.valoracion_3 = '12.3';
    this.valoracion_4 = (
      ((valorQuery[4][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_5 = (
      ((valorQuery[5][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);

    /*
       Valoración de los usuarios 
      */
    this.valoracion_0c = (
      ((valorConductorQuery[0][1] as number) * 100) /
      this.total_comentarios
    ).toFixed(2);
    this.valoracion_1c = (
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

    this.datos_grafica = [
      [defaultquery[0][1] as number],
      [defaultquery[1][1] as number],
      [defaultquery[2][1] as number],
    ];
    if (this.userQuery.TipoConsulta === undefined) {
      this.titleGraph(this.fecha_inical, this.fecha_final);
    } else {
      this.titleGraph(
        this.userQuery.FechaHoraRegistro,
        this.userQuery.FechaHoraFin
      );
    }
    /* 
    Generación de títulos
     */
    if (this.userQuery.TipoConsulta === undefined) {
      this.titleChart = `Calificación de los Clientes durante el perido de \n01 de Enero del 2021 al 31 de Enero del 2021`;
      this.reportes_principal = `De los ${this.total_comentarios} comentarios registrados en la 
        aplicación durante el periodo de tiempo de 01 de Enero del 2021 al 31 de Enero del 2021 se identificaron  que la percepción  de los clientes
        en un ${this.negativo}% es negativo, un ${this.neutral}% es neutral y un ${this.positivo}% es positivo.`;
    } else {
      if (this.userQuery.TipoConsulta === '1') {
        this.titleChart = `Percepción de comentarios de Conductores del \n ${this.fecha_inical} al ${this.fecha_final}`;
        this.reportes_principal = `De los ${this.total_comentarios} comentarios registrados en la 
        aplicación durante el periodo de tiempo de ${this.fecha_inical} al ${this.fecha_final} se identificaron  que la percepción  de los conductores
        en un ${this.negativo_conductor}% es negativo, un ${this.neutro_conductor}% es neutral y un ${this.positivo_conductor}% es positivo.`;
      } else if (this.userQuery.TipoConsulta === '2') {
        this.titleChart = `Percepción de comentarios de Clientes del \n${this.fecha_inical} al ${this.fecha_final}`;
        this.reportes_principal = `De los ${this.total_comentarios} comentarios registrados en la 
        aplicación durante el periodo de tiempo de ${this.fecha_inical} al ${this.fecha_final} se identificaron  que la percepción  de los clientes
        en un ${this.negativo}% es negativo, un ${this.neutral}% es neutral y un ${this.positivo}% es positivo.`;
      } else if (this.userQuery.TipoConsulta === '3') {
        this.titleChart = `Valoración de Clientes del \n${this.fecha_inical} al ${this.fecha_final}`;
        this.reportes_principal = `De los ${this.total_comentarios} comentarios registrados en la 
        aplicación durante el periodo de tiempo de ${this.fecha_inical} al ${this.fecha_final} las valoraciones muestran que el ${this.valoracion_0}% de los clientes no califican el servicio 
        de taxi, un ${this.valoracion_1}% califica al servicio con una estrella, ${this.valoracion_2} % 
        califican al servicio en 2 estrellals, un ${this.valoracion_3}% percibe el servicio con un rango de tres estrellas, un ${this.valoracion_4}% opina que el servicio está en el rango de
        4 estrellas y ${this.valoracion_5}% califican al servicio com el máximo puntaje.`;
      } else if (this.userQuery.TipoConsulta === '4') {
        this.titleChart = `Valoración de Conductores del \n${this.fecha_inical} al ${this.fecha_final}`;
        this.reportes_principal = `De los ${this.total_comentarios} comentarios registrados en la 
        aplicación durante el periodo de tiempo de ${this.fecha_inical} al ${this.fecha_final} las valoraciones muestran que el ${this.valoracion_0c}% de los conductores no califican el servicio 
        de taxi, un ${this.valoracion_1c}% califica al servicio con una estrella, ${this.valoracion_2c} % 
        califican al servicio en dos estrellals, un ${this.valoracion_3c}% percibe el servicio con un rango de tres estrellas, un ${this.valoracion_4c}% opina que el servicio está en el rango de
        cuatro estrellas y el ${this.valoracion_5c}% restante califican al servicio com el máximo puntaje.`;
      } else {
        this.titleChart = `Percepción de comentarios de clientes del \n 01 de Enero del 2021 al 31 de Enero del 2021`;
        this.reportes_principal = '';
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
