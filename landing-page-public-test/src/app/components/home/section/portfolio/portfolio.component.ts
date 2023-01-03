import { Component, OnInit } from '@angular/core';
// import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public chart: any;

  constructor() { }

  ngOnInit(): void {
  }

}
