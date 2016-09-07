import { Component, OnInit, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES, DatePipe } from '@angular/common';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import { DataService } from '../services/DataService';
import {GoogleChart} from '../directives/angular2-google-chart.directive';

@Component({
    selector: 'chart',
    templateUrl: 'views/chart/chart.component.html',
    directives: [CORE_DIRECTIVES, GoogleChart, MD_PROGRESS_CIRCLE_DIRECTIVES],
    providers: [DataService]
})
export class ChartComponent implements OnInit {
    public loading: boolean;
    public message: string;
    public values: any[];
    public refreshRequest = new EventEmitter<any>();

    public line_ChartOptions = {
        title: 'Weather in Ave Plaze (for latest 3 days)',
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
        this.refresh();
    }

    private setData(data) {
        var vals = new Array<any>();

        vals.push([
            { label: 'Time', type: 'date' },
            { label: 'temperature', type: 'number' },
            { label: 'humidity', type: 'number' },
        ]);

        data.forEach(function (dt) {
            var time = new Date(dt.time);
            vals.push([time, dt.temperature, dt.humidity]);
        });

        this.line_ChartData = vals;
        this.refreshRequest.next(vals);
    }

    refresh() {
        this.loading = true;
        this.dataService
            .GetAll()
            .subscribe(data => this.setData(data),
            error => console.log(error),
            () => {
                    this.loading = false;
                    console.log('Get all complete');
            });
    }
}
