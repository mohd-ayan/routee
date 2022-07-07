import { NgModule } from '@angular/core';

import { PristineWidgetComponent } from './widget.component';
import { PristineWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        PristineWidgetComponent,
        PristineWidgetToggleDirective
    ],
    exports     : [
        PristineWidgetComponent,
        PristineWidgetToggleDirective
    ],
})
export class PristineWidgetModule
{
}
