import { NgModule } from '@angular/core';

import { PristineCountdownComponent } from '@pristinebase/components/countdown/countdown.component';

@NgModule({
    declarations: [
        PristineCountdownComponent
    ],
    exports: [
        PristineCountdownComponent
    ],
})
export class PristineCountdownModule
{
}
