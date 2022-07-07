import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[pristineWidgetToggle]'
})
export class PristineWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
