import {NgModule} from '@angular/core';
import {RoleMasterModule} from "./RoleMaster/RoleMaster.module";
import {MatChipsModule} from '@angular/material/chips';
import {UserSetupModule} from "./UserSetup/UserSetup.module";

@NgModule({
    imports: [
        RoleMasterModule, MatChipsModule, UserSetupModule
    ]
})
export class SetupModule {
}
