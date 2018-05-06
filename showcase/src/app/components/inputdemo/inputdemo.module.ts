import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule}    from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InputDemoComponent } from './inputdemo.component';
import {InputDemoRoutingModule} from './inputdemo-routing.module';
import { InputModule } from '@ngcomponents/index';


@NgModule({
  declarations: [
    InputDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InputModule,
    InputDemoRoutingModule
  ]
})
export class InputDemoModule { }