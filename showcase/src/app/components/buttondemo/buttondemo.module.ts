import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule}    from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ButtonDemoComponent } from './buttondemo.component';
import { ButtonDemoRoutingModule} from './buttondemo-routing.module';
import { ButtonModule } from '@ngcomponents/index';


@NgModule({
  declarations: [
    ButtonDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    ButtonDemoRoutingModule
  ]
})
export class ButtonDemoModule { }