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
import {UserListComponent} from "./user-list.component";
import { UserCreateComponent } from './user-create/user-create.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";

const routes:Routes=[
  {
    path:'user_list',
    component:UserListComponent,
  }
]

@NgModule({
  declarations: [UserCreateComponent],
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
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
  ],entryComponents: [
    UserCreateComponent
  ]
})
export class UserListModule { }
