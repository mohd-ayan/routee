import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VendorListModule} from "./vendor-list/vendor-list.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {PristinePipesModule} from "../../../@pristinebase/pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {PristineSharedModule} from "../../../@pristinebase/shared.module";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {VendorInfoModule} from "./vendor-info/vendor-info.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexModule,
    VendorListModule,
    VendorInfoModule,
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
    MatInputModule
  ]
})
export class VendorModule { }
