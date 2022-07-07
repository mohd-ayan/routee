import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PristineDirectivesModule} from '@pristinebase/directives/directives';
import {PristinePipesModule} from '@pristinebase/pipes/pipes.module';
import {ToastrModule} from "ngx-toastr";
import {
    DeleteRolemasterDailogModule,
    PristineCageAddModule,
    PristineConfirmDialogInputModule,
    PristineConfirmDialogModule
} from "./components";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        PristineDirectivesModule,
        PristinePipesModule,
        ToastrModule.forRoot(), // ToastrModule added
        PristineConfirmDialogModule,
        PristineConfirmDialogInputModule,
        PristineCageAddModule,
        DeleteRolemasterDailogModule,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        PristineDirectivesModule,
        PristinePipesModule,
        PristineConfirmDialogInputModule,
        PristineCageAddModule,
        DeleteRolemasterDailogModule
    ],

})
export class PristineSharedModule {

}
