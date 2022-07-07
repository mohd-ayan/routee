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
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {DownloadPackingListComponent} from "./download-packing-list.component";
import { ViewPackingListComponent } from './view-packing-list/view-packing-list.component';
import {MatDividerModule} from "@angular/material/divider";

const routes:Routes=[
  {
    path:'download_packing_list',
    component:DownloadPackingListComponent,
  }
]

@NgModule({
  declarations: [DownloadPackingListComponent, ViewPackingListComponent],
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
        MatSortModule,
        MatTooltipModule,
        MatInputModule,
        MatDividerModule,
    ],
  entryComponents:[
    ViewPackingListComponent
  ]
})
export class DownloadPackingListModule { }
