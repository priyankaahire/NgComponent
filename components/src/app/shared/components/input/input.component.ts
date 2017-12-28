import { NgModule, Component, AfterViewInit, ElementRef, OnDestroy, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../components.interfaces';

/*
* <av-input id="username" name="username" class="username" type="text" placeholder="Username" [(ngModel)]="username"></av-input>
*/
@Component({
  moduleId: module.id,
  selector: 'my-input',
  templateUrl:'input.template.html',
  providers: [DomHandler]
})
export class InputComponent implements AfterViewInit, OnDestroy {
   constructor(private el: ElementRef, private domHandler: DomHandler) {}
    @Input() isOptional: boolean = false;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() isDisabled: boolean = false;
    @Input() readonly: string = '';
    @Input() type: string = 'text';
    @Input() name: string = '';
    @Input() value: string = '';
    @Input() width: string = '';
    @Input() align: string;
    private initialized: boolean;
    ngAfterViewInit() {
    }
  ngOnDestroy() {
    while (this.el.nativeElement.hasChildNodes()) {
      this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
    }
    this.initialized = false;
  }
}


