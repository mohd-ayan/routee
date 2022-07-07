import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DeleteRolemasterDailogComponent} from "./delete-rolemaster-dailog.component";

@NgModule({
    declarations: [
        DeleteRolemasterDailogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    entryComponents: [
        DeleteRolemasterDailogComponent
    ],
})
export class DeleteRolemasterDailogModule {
}
