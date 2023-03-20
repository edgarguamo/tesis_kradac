import { colorscheme1, colorscheme2 } from './defaultdata.component';

let title_data = [];

export function listDataGraphs(
  tipo_usuario: string = 'cliente',
  tipo_consulta: string = 'bar',
  data: any,
  fecha_inicial: string = '2021-01-01',
  fecha_final: string = '2021-01-31'
): any {
  
  title_data = [];
  let chart_data = [];
  
  switch (tipo_consulta) {
    case 'bar':
      for (let i = 0; i < data.length; i++) {
        chart_data.push({
          data: [data[i][1] as number],
          label: [data[i][0]],
          backgroundColor: [colorscheme2[i]],
        });
      }
      title_data = [`De ${fecha_inicial} al ${fecha_final}`];
      return chart_data;
      break;
    case 'line':
      let intervalofinal = new Date(fecha_final.substring(0, 10));
      let intervaloinicial = new Date(fecha_inicial.substring(0, 10));
      let fecha_aux = fecha_inicial.substring(0, 10);
      let lista_titulos = [];
      let lista_neg = [];
      let lista_pos = [];
      let lista_neu = [];
      let linealgraph;

      let dias = Math.floor(
        (intervalofinal.getTime() - intervaloinicial.getTime()) /
          (1000 * 60 * 60 * 24) /
          4
      );

      for (let i = 0; i <= 4; i++) {
        if (tipo_usuario === 'cliente') {
          linealgraph = Object.entries(
            data
              .filter((e) => e.FechaHoraRegistro.substring(0, 10) === fecha_aux)
              .reduce(
                (aux, d) => (
                  aux[d.CalificacionClientes]
                    ? (aux[d.CalificacionClientes] += 1)
                    : (aux[d.CalificacionClientes] = 1),
                  aux
                ),
                {}
              )
          );
        } else {
          linealgraph = Object.entries(
            data
              .filter((e) => e.FechaHoraRegistro.substring(0, 10) === fecha_aux)
              .reduce(
                (aux, d) => (
                  aux[d.CalificacionChoferes]
                    ? (aux[d.CalificacionChoferes] += 1)
                    : (aux[d.CalificacionChoferes] = 1),
                  aux
                ),
                {}
              )
          );
        }
        lista_titulos.push(fecha_aux);
        for (let j = 0; j < linealgraph.length; j++) {
          if (linealgraph[j][0] === 'Negativo') {
            lista_neg.push(linealgraph[j][1]);
          } else if (linealgraph[j][0] === 'Neutral') {
            lista_neu.push(linealgraph[j][1]);
          } else {
            lista_pos.push(linealgraph[j][1]);
          }
        }

        if (lista_neg.length !== i + 1) {
          lista_neg.push(0);
        }
        if (lista_neu.length !== i + 1) {
          lista_neu.push(0);
        }
        if (lista_pos.length !== i + 1) {
          lista_pos.push(0);
        }

        intervaloinicial = new Date(
          intervaloinicial.setDate(intervaloinicial.getDate() + dias)
        );
        fecha_aux = intervaloinicial.toISOString().substring(0, 10);
      }

      let chartData = [
        {
          data: lista_neg,
          label: ['Negativo'],
          backgroundColor: [colorscheme2[0]],
        },
        {
          data: lista_neu,
          label: ['Neutral'],
          backgroundColor: [colorscheme2[1]],
        },
        {
          data: lista_pos,
          label: ['Positivo'],
          backgroundColor: [colorscheme2[2]],
        },
      ];
      title_data = lista_titulos;
      return chartData;
      break;
    default:
      console.log('mensaje para generar grafica por defecto');
      let dataLabels = [];
      let dataTitles = [];
      let defaultchartData = [];
      for (let i = 0; i < data.length; i++) {
        dataLabels.push(data[i][1] as number);
        dataTitles.push(data[i][0]);
        title_data.push(data[i][0]);
      }
      if (data.length === 3) {
        defaultchartData = [
          {
            data: dataLabels,
            label: dataTitles,
            backgroundColor: colorscheme2,
          },
        ];
      } else {
        defaultchartData = [
          {
            data: dataLabels,
            label: dataTitles,
            backgroundColor: colorscheme1,
          },
        ];
      }

      return defaultchartData;
      break;
  }
}

export function listDataGraphs5(
  tipo_usuario: string = 'cliente',
  data: any,
  fecha_inicial: string = '2021-01-01',
  fecha_final: string = '2021-01-31'
) {
  let intervalofinal = new Date(fecha_final.substring(0, 10));
  let intervaloinicial = new Date(fecha_inicial.substring(0, 10));
  let fecha_aux = fecha_inicial.substring(0, 10);
  let lista_titulos = [];
  let lista_0 = [];
  let lista_1 = [];
  let lista_2 = [];
  let lista_3 = [];
  let lista_4 = [];
  let lista_5 = [];
  let linealgraph ;

  let dias = Math.floor(
    (intervalofinal.getTime() - intervaloinicial.getTime()) /
      (1000 * 60 * 60 * 24) /
      4
  );

  for (let i = 0; i <= 4; i++) {
    if (tipo_usuario === 'cliente') {
      linealgraph = Object.entries(
        data
          .filter((e) => e.FechaHoraRegistro.substring(0, 10) === fecha_aux)
          .reduce(
            (aux, d) => (
              aux[d.ValoracionClientes]
                ? (aux[d.ValoracionClientes] += 1)
                : (aux[d.ValoracionClientes] = 1),
              aux
            ),
            {}
          )
      );
    } else {
      linealgraph = Object.entries(
        data
          .filter((e) => e.FechaHoraRegistro.substring(0, 10) === fecha_aux)
          .reduce(
            (aux, d) => (
              aux[d.ValoracionClientes]
                ? (aux[d.ValoracionChoferes] += 1)
                : (aux[d.ValoracionChoferes] = 1),
              aux
            ),
            {}
          )
      );
    }
    lista_titulos.push(fecha_aux);
    for (let j = 0; j < linealgraph.length; j++) {
      if (linealgraph[j][0] == '0') {
        lista_0.push(linealgraph[j][1]);
      } else if (linealgraph[j][0] == '1') {
        lista_1.push(linealgraph[j][1]);
      } else if (linealgraph[j][0] == '2') {
        lista_2.push(linealgraph[j][1]);
      } else if (linealgraph[j][0] == '3') {
        lista_3.push(linealgraph[j][1]);
      } else if (linealgraph[j][0] == '4') {
        lista_4.push(linealgraph[j][1]);
      } else {
        lista_5.push(linealgraph[j][1]);
      }
    }
    

    if (lista_0.length !== i + 1) {
      lista_0.push(0);
    }
    if (lista_1.length !== i + 1) {
      lista_1.push(0);
    }
    if (lista_2.length !== i + 1) {
      lista_2.push(0);
    }
    if (lista_3.length !== i + 1) {
      lista_2.push(0);
    }
    if (lista_4.length !== i + 1) {
      lista_2.push(0);
    }
    if (lista_5.length !== i + 1) {
      lista_2.push(0);
    }
    console.log(linealgraph);
    intervaloinicial = new Date(
      intervaloinicial.setDate(intervaloinicial.getDate() + dias)
    );
    fecha_aux = intervaloinicial.toISOString().substring(0, 10);
  }

  let chartData = [
    {
      data: lista_0,
      label: ['0'],
      backgroundColor: [colorscheme2[0]],
    },
    {
      data: lista_1,
      label: ['1'],
      backgroundColor: [colorscheme2[1]],
    },
    {
      data: lista_2,
      label: ['2'],
      backgroundColor: [colorscheme2[2]],
    },
    {
      data: lista_3,
      label: ['3'],
      backgroundColor: [colorscheme2[2]],
    },
    {
      data: lista_4,
      label: ['4'],
      backgroundColor: [colorscheme2[2]],
    },
    {
      data: lista_5,
      label: ['5'],
      backgroundColor: [colorscheme2[2]],
    },
  ];
  title_data = lista_titulos;
  return chartData;
}

export function get_title_chart(): any {
  return title_data;
}
