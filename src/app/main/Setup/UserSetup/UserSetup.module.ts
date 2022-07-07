import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {UserDetailModule} from "./UserDetail/UserDetail.module";
import {CreateUserDialogModule} from "./CreateUser-dialog/CreateUser-dialog.module";
import {ChangeIPDialogModule} from "./ChangeIP-dialog/ChangeIP-dialog.module";


@NgModule({
    imports: [
        MatChipsModule, UserDetailModule, CreateUserDialogModule, ChangeIPDialogModule
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class UserSetupModule {
}
