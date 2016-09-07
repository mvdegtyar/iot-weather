import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { DataService } from '../services/DataService';

@Component({
    selector: 'home',
    templateUrl: 'views/home/home.component.html',
    directives: [CORE_DIRECTIVES],
    providers:[DataService]
})

export class HomeComponent implements OnInit {

    public values: any[];

    constructor(private dataService : DataService) {
    }

    ngOnInit() {
        this.dataService
        .GetAll()
        .subscribe(data => this.values = data,
                error => console.log(error),
                () => console.log('Get all complete'));
    }
}
