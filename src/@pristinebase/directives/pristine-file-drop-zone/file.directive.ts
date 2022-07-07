import {
  Directive,
  HostListener,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare interface HTMLInputElement {
  files: FileList | null;
}

@Directive({
  /* tslint:disable:directive-selector */
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileDirective),
      multi: true
    }
  ]
})
export class FileDirective implements ControlValueAccessor {
  public onChange = (_) => {};
  public onTouched = () => {};

  constructor(private element: ElementRef) { }

  private get inputElement(): HTMLInputElement {
    return this.element.nativeElement;
  }

  public get file(): File {

    return this.inputElement.files[0];
  }

  public get files(): FileList {

    return this.inputElement.files;
  }

  public set files(files: FileList) {

    this.inputElement.files = files;
  }

  public writeValue(files: FileList) {
    if (files) {
      this.files = files;
    }
  }

  public registerOnChange(fn) { this.onChange = fn; }
  public registerOnTouched(fn) { this.onTouched = fn; }

  @HostListener('change', ['$event.target.files'])
  public handleChange(files: FileList) {
    this.onChange(files);
  }

  @HostListener('blur')
  public handleTouched() {
    this.onTouched();
  }
}
