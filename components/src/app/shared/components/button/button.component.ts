import { Output, EventEmitter, Component, NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, HostBinding, HostListener, Input } from '@angular/core';
import { DomHandler } from '../components.interfaces';

@Component({
  moduleId: module.id,
  selector: 'my-button',
  templateUrl:'button.template.html',
  providers: [DomHandler]
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() iconPos: string = 'left';
  @Input() icon: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() style: any;
  @Input() styleClass: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
}
