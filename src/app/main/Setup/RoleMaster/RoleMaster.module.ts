import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule
} from '@angular/material';

import {PristineSharedModule} from '@pristinebase/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AmazingTimePickerModule} from "amazing-time-picker";
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectAutocompleteModule} from "mat-select-autocomplete";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AuthGuard} from "../../../../@pristinebase/Process/AuthGuard/AuthGuard";
import {RoleMasterComponent} from "./RoleMaster.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTreeModule} from "@angular/material/tree";

const routes: Routes = [
    {
        path: 'rolemaster',
        component: RoleMasterComponent,
        //resolve: {rolemaster: RoleMasterService},
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        RoleMasterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatSnackBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatCardModule,
        PristineSharedModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatGridListModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatChipsModule,
        MatMenuModule,
        MatToolbarModule,
        AmazingTimePickerModule,
        MatListModule,
        MatRippleModule,
        MatCheckboxModule,
        SelectAutocompleteModule,
        DragDropModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTreeModule
    ],
    entryComponents: [],
    //providers: [RoleMasterService]
})
export class RoleMasterModule {
}
