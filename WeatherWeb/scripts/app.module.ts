import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdCardModule } from '@angular2-material/card';
import { routing, appRoutingProviders } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule
    ],

    declarations: [AppComponent, HomeComponent, AboutComponent, ChartComponent],

    providers: [
        appRoutingProviders,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    
    bootstrap: [AppComponent] 
})
export class AppModule { }