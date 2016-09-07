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
var DataService_1 = require('../services/DataService');
var angular2_google_chart_directive_1 = require('../directives/angular2-google-chart.directive');
var ChartComponent = (function () {
    function ChartComponent(dataService) {
        this.dataService = dataService;
        this.line_ChartOptions = {
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
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService
            .GetAll()
            .subscribe(function (data) { return _this.setData(data); }, function (error) { return console.log(error); }, function () { return console.log('Get all complete'); });
    };
    ChartComponent.prototype.setData = function (data) {
        var vals = new Array();
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
    };
    ChartComponent.prototype.createCustomTooltip = function (name, time, val) {
        var tm = new common_1.DatePipe().transform(time, 'MMM dd - hh:mm');
        return "<div style=\"margin: 10px; font-size: 1.5em\"><b>" + tm + "</b></br>" + name + ":&nbsp<b>" + val + "</b></div>";
    };
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: 'views/chart/chart.component.html',
            directives: [common_1.CORE_DIRECTIVES, angular2_google_chart_directive_1.GoogleChart],
            providers: [DataService_1.DataService]
        }), 
        __metadata('design:paramtypes', [DataService_1.DataService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
