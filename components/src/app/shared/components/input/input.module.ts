import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input.component';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [InputComponent],
  declarations: [InputComponent]
})
export class InputModule { }
