import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Inject, AfterViewChecked, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpModule, Http, Response, Headers, BaseRequestOptions, RequestOptions, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'assetvantage',
  templateUrl: './app.component.html',
  providers:[],
})

export class AppComponent {
  constructor() {
  }
  ngOnInit() {
  }
}
