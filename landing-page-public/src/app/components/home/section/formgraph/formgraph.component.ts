import { GraficaComponent } from './../grafica/grafica.component';
import { Component, OnInit } from '@angular/core';
import { UsuariosComentarios } from 'src/app/models/usuarios-comentarios.model';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-formgraph',
  templateUrl: './formgraph.component.html',
  styleUrls: ['./formgraph.component.css'],
})
export class FormgraphComponent implements OnInit {
  private FechaHoraRegistro = '';
  private listDataset: UsuariosComentarios[] = [];
  chartData = [];

  chartLabels = [];

  chartOptions = {
    responsive: true,
  };
  titleChart = 'Distribución de clientes en el mes de enero';
  userQuery = new UsuariosComentarios();

  constructor(private dataService: DataService) {}

  formSend() {
    this.dataService
      .getUsuariosComentariosConsulta(
        this.userQuery.TipoConsulta,
        this.userQuery.FechaHoraRegistro,
        this.userQuery.FechaHoraFin
      )
      .subscribe((data) => this.setListDataset(data));
    /*
    Aquí el formulario ha sido enviado, ya sea
    por presionar el botón, presionar Enter, etcétera
    */
    console.log('El formulario fue enviado y la mascota es: ', this.userQuery);
    alert('Enviado');
  }
  public setListDataset(data: UsuariosComentarios[]): void {
    this.listDataset = data;
    //console.log(this.listDataset);
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
    console.log(defaultquery[0][1]);
    console.log(defaultquery);
    console.log(typeof defaultquery[0][1]);

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
    GraficaComponent.call(this, this.chartData, this.chartLabels);
    console.log(this.chartData);
    this.chartLabels = [
      defaultquery[0][0],
      defaultquery[1][0],
      defaultquery[2][0],
    ];
    this.titleChart = 'Percepción de comentarios en el mes de Enero 2021';
  }
  ngOnInit(): void {}
}
