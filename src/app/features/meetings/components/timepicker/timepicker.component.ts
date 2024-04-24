import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Optional,
  Self,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type TimepickerHours = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export type TimepickerMinutes = '00' | '15' | '30' | '45';
export type TimepickerPeriod = 'AM' | 'PM';
export class TimepickerTime {
  hours: TimepickerHours;
  minutes: TimepickerMinutes;
  period: TimepickerPeriod;

  constructor(hours: TimepickerHours, minutes: TimepickerMinutes, period: TimepickerPeriod) {
    this.hours = hours;
    this.minutes = minutes;
    this.period = period;
  }
}

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonToggleModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: TimepickerComponent
    }
  ],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss',
})
export class TimepickerComponent implements ControlValueAccessor {
  
  timepickerForm = inject(FormBuilder).group({
    hours: new FormControl<TimepickerHours>('12', Validators.required),
    minutes: new FormControl<TimepickerMinutes>('00', Validators.required),
    period: new FormControl<TimepickerPeriod>('AM', Validators.required),
  });

  touched: WritableSignal<boolean> = signal<boolean>(false);
  disabled: WritableSignal<boolean> = signal<boolean>(false);

  onChange = (time: TimepickerTime) => { };
  onTouched = () => { };

  writeValue(value: TimepickerTime) {
    if (value) {
      this.timepickerForm.setValue({...value})
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched()) {
      this.onTouched();
      this.touched.set(true);
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled.set(disabled);
  }

  constructor() {
    this.timepickerForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.onChange(value as TimepickerTime);
    });
  }

}
