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
var HomeComponent = (function () {
    function HomeComponent(dataService) {
        this.dataService = dataService;
    }
    HomeComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.dataService
            .GetAll()
            .subscribe(function (data) { return _this.values = data; }, function (error) { return console.log(error); }, function () {
            _this.loading = false;
            console.log('Get all complete');
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'views/home/home.component.html',
            directives: [common_1.CORE_DIRECTIVES, progress_circle_1.MD_PROGRESS_CIRCLE_DIRECTIVES],
            providers: [DataService_1.DataService]
        }), 
        __metadata('design:paramtypes', [DataService_1.DataService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map