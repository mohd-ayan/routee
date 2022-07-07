import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";


@Pipe({
    name: "searchShippingOrderData"
})
export class searchShippingOrderDataFilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return _.filter(items, field => field.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
    }
}

@Pipe({
    name: "searchPendingDocNo"
})
export class SearchPendingDocNoFilterPipe implements PipeTransform {
    transform(items: any, value: string): any {
        if (!items) {
            return items;
        }
        if (!value) {
            return items;
        }
        return _.filter(items, field => field.sub_manifest_no.toLowerCase().indexOf(value.toLowerCase()) > -1)
    }
}


@Pipe({
    name: 'filter_byKey'
})
export class FilterByKey implements PipeTransform {
    transform(items: any[], value: string, key: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return _.filter(items, field => {
            if (field[key] == null)
                return false;
            else
                return field[key].toLowerCase().indexOf(value.toLowerCase()) > -1
        })
    }
}

@Pipe({
    name: 'sum'
})
export class SumByKey implements PipeTransform {
    transform(items: any[], key: string): any {
        let data: number = 0
        if (!items) {
            return data;
        }

        for (var i = 0; i < items.length; i++) {
            data += items[i][key];
        }
        return data;
    }
}

@Pipe({
    name: "searchSellerData"
})
export class searchSellerDataFilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }
        return _.filter(items, field => field.seller_name.toLowerCase().indexOf(value.toLowerCase()) > -1)
    }
}
