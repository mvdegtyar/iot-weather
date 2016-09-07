import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, DatePipe } from '@angular/common';
import { DataService } from '../services/DataService';
import {GoogleChart} from '../directives/angular2-google-chart.directive';

@Component({
    selector: 'chart',
    templateUrl: 'views/chart/chart.component.html',
    directives: [CORE_DIRECTIVES, GoogleChart],
    providers: [DataService]
})
export class ChartComponent implements OnInit {

    public message: string;
    public values: any[];

    public line_ChartOptions = {
        title: 'Weather in Ave Plaze (for latest 3 days)',
        width: '100%',
        height: 500,
        curveType: 'function',
        pointSize: 5,
  //      tooltip: { isHtml: true },
        // Gives each series an axis that matches the vAxes number below.
        series: {
            0: { targetAxisIndex: 0 },
            1: { targetAxisIndex: 1 }
        },
        vAxes: {
            // Adds titles to each axis.
            0: { title: 'Temps (Celsius)' },
            1: { title: 'Humidity' }
        },
        hAxis: {
            gridlines: {
                count: -1,
                units: {
                    days: { format: ['dd'] },
                    hours: { format: ['HH:mm', 'ha'] },
                }
            }
        }
    };

    public line_ChartData; 
  
    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService
            .GetAll()
            .subscribe(data => this.setData( data),
                error => console.log(error),
                () => console.log('Get all complete'));
    }

    private setData(data) {
        var vals = new Array<any>();

        //vals.push([
        //    { label: 'Time', type: 'date' },
        //    { label: 'temperature', type: 'number' },
        //    { label: 'temperature_tooltip', role: 'tooltip', p: { html: true } },
        //    { label: 'humidity', type: 'number' },
        //    { label: 'humidity_tooltip', role: 'tooltip', p: { html: true } },
        //]);

         vals.push([
            { label: 'Time', type: 'date' },
            { label: 'temperature', type: 'number' },
            { label: 'humidity', type: 'number' },
        ]);

        data.forEach(function (dt) {
            var time = new Date(dt.time);
            vals.push([time, dt.temperature, dt.humidity]);
        });

        //data.forEach(function (dt) {
        //    var time = new Date(dt.time);
        //    vals.push([time, dt.temperature, this.createCustomTooltip('temperature', dt.temperature, time), dt.humidity, dt.humidity]);
        //});

        //data.forEach(dt =>
        //        {
        //            var time = new Date(dt.time);
        //            vals.push([time, dt.temperature, this.createCustomTooltip('temperature', time, dt.temperature), dt.humidity, this.createCustomTooltip('humidity', time, dt.humidity)]);
        //});

        this.line_ChartData = vals;
    }

    private createCustomTooltip(name, time, val) {
        var tm = new DatePipe().transform(time, 'MMM dd - hh:mm');
        return `<div style="margin: 10px; font-size: 1.5em"><b>${tm}</b></br>${name}:&nbsp<b>${val}</b></div>`;
    }
}
