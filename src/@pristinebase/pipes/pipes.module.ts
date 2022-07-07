import {NgModule} from '@angular/core';

import {KeysPipe} from './keys.pipe';
import {GetByIdPipe} from './getById.pipe';
import {HtmlToPlaintextPipe} from './htmlToPlaintext.pipe';
import {FilterPipe} from './filter.pipe';
import {CamelCaseToDashPipe} from './camelCaseToDash.pipe';
import {Time24to12Pipe} from "./time24to12";
import {FirstAnd_Split} from "./FirstAnd_Split";
import {ForceAssignment} from "./ForceAssignment";
import {
    FilterByKey,
    SearchPendingDocNoFilterPipe, searchSellerDataFilterPipe,
    searchShippingOrderDataFilterPipe,
    SumByKey
} from "./data-filter.pipe";
import {Dropdownsearch} from "./dropdownsearch";

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        Time24to12Pipe,
        FirstAnd_Split,
        ForceAssignment,
        searchShippingOrderDataFilterPipe,
        SearchPendingDocNoFilterPipe,
        Dropdownsearch,
        FilterByKey,
        SumByKey,
        searchSellerDataFilterPipe
    ],
    imports: [],
    exports: [
        KeysPipe,
        SumByKey,
        GetByIdPipe,
        FilterByKey,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        Time24to12Pipe,
        FirstAnd_Split,
        ForceAssignment,
        searchShippingOrderDataFilterPipe,
        SearchPendingDocNoFilterPipe,
        Dropdownsearch,
        searchSellerDataFilterPipe
    ]
})
export class PristinePipesModule {
}
