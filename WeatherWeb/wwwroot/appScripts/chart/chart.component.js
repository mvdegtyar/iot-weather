"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var progress_circle_1 = require('@angular2-material/progress-circle');
var DataService_1 = require('../services/DataService');
var angular2_google_chart_directive_1 = require('../directives/angular2-google-chart.directive');
var ChartComponent = (function () {
    function ChartComponent(dataService) {
        this.dataService = dataService;
        this.refreshRequest = new core_1.EventEmitter();
        this.line_ChartOptions = {
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
                0: { title: 'Humidity (%)' },
                1: { title: 'Temps (Celsius)' }
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
    }
    ChartComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    ChartComponent.prototype.setData = function (data) {
        var vals = new Array();
        vals.push([
            { label: 'Time', type: 'date' },
            { label: 'humidity', type: 'number' },
            { label: 'temperature', type: 'number' }
        ]);
        data.forEach(function (dt) {
            var time = new Date(dt.time);
            vals.push([time, dt.humidity, dt.temperature]);
        });
        this.currentAvailable = false;
        if (data.length) {
            var timeDiff = new Date().getTime() - (new Date(data[0].time)).getTime();
            var hoursDiff = timeDiff / (1000 * 3600);
            if (hoursDiff < 1) {
                this.currentAvailable = true;
                this.currentTemp = data[0].temperature;
                this.currentHumidity = data[0].humidity;
            }
        }
        this.line_ChartData = vals;
        this.refreshRequest.next(vals);
    };
    ChartComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.dataService
            .GetAll()
            .subscribe(function (data) { return _this.setData(data); }, function (error) { return console.log(error); }, function () {
            _this.loading = false;
            console.log('Get all complete');
        });
    };
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: 'views/chart/chart.component.html',
            directives: [common_1.CORE_DIRECTIVES, angular2_google_chart_directive_1.GoogleChart, progress_circle_1.MD_PROGRESS_CIRCLE_DIRECTIVES],
            providers: [DataService_1.DataService]
        }), 
        __metadata('design:paramtypes', [DataService_1.DataService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map