import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {Pristine_CONFIG} from '@pristinebase/services/config.service';
import {EncriptDecript} from "./Process/EncriptDecript";
import {ValidateResponse} from "./Process/ValidateResponse";
import {PristineToaster} from "./Process/ZivameServices/PristineToaster";
import {WebApiHttp} from "./Process/WebApiHttp.services";
import {ExcelService} from "./Process/excel.Service";
import {AuthGuard} from "./Process/AuthGuard/AuthGuard";
import {SignalR} from "./Process/signalr/SignalR";

@NgModule()
export class PristineModule
{
    constructor(@Optional() @SkipSelf() parentModule: PristineModule)
    {
        if ( parentModule )
        {
            throw new Error('PristineModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : PristineModule,
            providers: [
                EncriptDecript, ValidateResponse, PristineToaster, WebApiHttp, ExcelService, AuthGuard, SignalR,
                {
                    provide : Pristine_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
