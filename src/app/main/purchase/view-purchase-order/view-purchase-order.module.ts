import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {PristineSharedModule} from "../../../../@pristinebase/shared.module";
import {PristineWidgetModule} from "../../../../@pristinebase/components";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {ViewPurchaseOrderComponent} from "./view-purchase-order.component";

const routes:Routes=[
  {
    path:'purchase_order_list/view_purchase_order',
    component:ViewPurchaseOrderComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    PristineSharedModule,
    PristineWidgetModule,
    Ng2SmartTableModule,
    MatCardModule,
    MatProgressBarModule,
    MatRippleModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class ViewPurchaseOrderModule { }
