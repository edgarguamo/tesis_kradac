import { UsuariosComentarios } from './../../../../models/usuarios-comentarios.model';
import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

/*
class Mascota {
  constructor(
        public nombre: string,
        public raza: string,
        public edad: number
    ) { }
}
*/

@Component({
  selector: 'app-root',
  templateUrl: './formgraph.component.html',
  styleUrls: [ './formgraph.component.css']
})
export class AppComponent implements OnInit{
  // El modelo ligado al formulario, por defecto vacío
  userQuery = new UsuariosComentarios();

  constructor() {}

  ngOnInit() {}

  formSend(){
    /*
    Aquí el formulario ha sido enviado, ya sea
    por presionar el botón, presionar Enter, etcétera
    */
    console.log("El formulario fue enviado y la mascota es: ", this.userQuery)
    alert("Enviado");
  }

}

