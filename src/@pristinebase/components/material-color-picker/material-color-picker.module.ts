import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PristinePipesModule } from '@pristinebase/pipes/pipes.module';

import { PristineMaterialColorPickerComponent } from '@pristinebase/components/material-color-picker/material-color-picker.component';

@NgModule({
    declarations: [
        PristineMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        PristinePipesModule
    ],
    exports: [
        PristineMaterialColorPickerComponent
    ],
})
export class PristineMaterialColorPickerModule
{
}
