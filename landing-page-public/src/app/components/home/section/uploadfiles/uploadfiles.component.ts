import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {

  modalSwitch:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalSwitch = true;
  }

}
