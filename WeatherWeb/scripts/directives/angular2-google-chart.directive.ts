import {Directive,ElementRef,Input,OnInit} from '@angular/core';
declare var google:any;
declare var googleLoaded: any;

@Directive({
  selector: '[GoogleChart]',
  // properties: [
  //     'chartType',
  //     'chartOptions',
  //     'chartData'
  //   ]
})
export class GoogleChart implements OnInit {
    public _element: any;
    static _googleLoaded: any;
    //private _googleLoaded: any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
      if (!GoogleChart._googleLoaded) {
          GoogleChart._googleLoaded = true;
    google.charts.load('current', {'packages':['corechart', 'gauge', 'line']});
     }
    setTimeout(() =>this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element),1000);
  }
  drawGraph (chartOptions,chartType,chartData,ele) {
      var data = google.visualization.arrayToDataTable(chartData);
      var numberFormatter = new google.visualization.NumberFormat({ fractionDigits: 2 });
      numberFormatter.format(data, 1);
      numberFormatter.format(data, 2);
      var timeFormatter = new google.visualization.DateFormat({ pattern: 'MMM dd - hh:mm' });
      timeFormatter.format(data, 0);

      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var wrapper = new google.visualization.ChartWrapper({
             chartType: chartType,
             dataTable: data ,
             options:chartOptions || {},
             containerId: ele.id
           });
      wrapper.draw();
    }
  }
}

