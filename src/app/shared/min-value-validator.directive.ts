import { Directive, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinValueValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueValidatorDirective, multi: true}]
})
export class MinValueValidatorDirective implements Validator{
  @Input('appMinValueValidator') thresholdValue: number;

  validate(control: FormControl) {
    if(isNaN(+control.value)) return {'minValue': true}

    if(+control.value < this.thresholdValue){
      return {'minValue': true, 'thresholdValue': this.thresholdValue}
    }
    return null;
  }
}
