import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';

import {PristineSearchBarModule, PristineShortcutsModule} from '@pristinebase/components';
import {PristineSharedModule} from '@pristinebase/shared.module';

import {ToolbarComponent} from 'app/layout/components/toolbar/toolbar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatListModule} from "@angular/material/list";

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        PristineSharedModule,
        PristineSearchBarModule,
        PristineShortcutsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatListModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
