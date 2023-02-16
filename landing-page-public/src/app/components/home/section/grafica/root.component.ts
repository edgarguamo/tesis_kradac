
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
})

export class AppComponent {
    chartData = [];
  
    handleFormData(data) {
      this.chartData.push(data);
    }
  }