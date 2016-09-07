import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import { DataService } from '../services/DataService';

@Component({
    selector: 'home',
    templateUrl: 'views/home/home.component.html',
    directives: [CORE_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES],
    providers:[DataService]
})

export class HomeComponent implements OnInit {
    public loading: boolean;
    public values: any[];

    constructor(private dataService : DataService) {
    }

    refresh() {
       this.loading = true;
        this.dataService
            .GetAll()
            .subscribe(data => this.values = data,
             error => console.log(error),
             () => {
                 this.loading = false;
                 console.log('Get all complete');
             });
    }

    ngOnInit() {
       this.refresh();
    }

    
}
