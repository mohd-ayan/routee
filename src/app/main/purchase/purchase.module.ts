import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseOrderListModule} from "./purchase-order-list/purchase-order-list.module";
import { ViewPurchaseOrderComponent } from './view-purchase-order/view-purchase-order.component';
import {ViewPurchaseOrderModule} from "./view-purchase-order/view-purchase-order.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {PristinePipesModule} from "../../../@pristinebase/pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {PristineSharedModule} from "../../../@pristinebase/shared.module";
import {MatInputModule} from "@angular/material/input";
import {DownloadBarcodeModule} from "./download-barcode/download-barcode.module";
import {PurchaseLogsListModule} from "./purchase-logs-list/purchase-logs-list.module";
import {PurchaseAdminLogModule} from "./purchase-admin-log/purchase-admin-log.module";
import {AllPurchaseOrderListModule} from "./all-purchase-order-list/all-purchase-order-list.module";
import {AdminViewPurchaseOrderModule} from "./admin-view-purchase-order/admin-view-purchase-order.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [ViewPurchaseOrderComponent],
    imports: [
        CommonModule,
        FlexModule,
        PurchaseOrderListModule,
        ViewPurchaseOrderModule,
        DownloadBarcodeModule,
        PurchaseLogsListModule,
        PurchaseAdminLogModule,
        AllPurchaseOrderListModule,
        AdminViewPurchaseOrderModule,
        MatPaginatorModule,
        MatTableModule,
        PristinePipesModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        PristineSharedModule,
        MatInputModule,
        MatTooltipModule,
        MatDividerModule
    ]
})
export class PurchaseModule { }
