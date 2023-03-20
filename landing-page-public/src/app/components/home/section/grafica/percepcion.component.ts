export function percepcion(consulta): any{
    let total = 0;
    let resultados = [];

    for (let i = 0; i < consulta.length; i++) {
        total = total + (consulta[i][1] as number);
    }

    console.log(total);

    for (let i = 0; i < consulta.length; i++) {
    resultados.push([consulta[i][0], ((consulta[i][1] as number) * 100  / total).toFixed(2)]);
    }

    return resultados;

}