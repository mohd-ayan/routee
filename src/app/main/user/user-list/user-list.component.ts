import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Vendor_list_model} from "../../vendor/vendor-list/vendor_list_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {User_list_model} from "./user_list_model";
import {UserCreateComponent} from "./user-create/user-create.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataSource : MatTableDataSource<User_list_model> = new MatTableDataSource<User_list_model>([]);
  purchase_order_list: Array<User_list_model> = [];
  displayColumn: string[] = ["vendor_code", "name" , "phoneNo","email"]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public WebApiHttp: WebApiHttp,
              public _toasterService: PristineToaster,
              private spinner: NgxSpinnerService,
              private composeDialog: MatDialog,
              private _router: Router,
              public  fb: FormBuilder,
              private _encryptdecrypt: EncriptDecript,
              private _excelService: ExcelService,) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User_list_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetAllUserList();
  }

  applyFilter(filterValue: string, keyName: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
        return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
      } else {
        return false
      }
    };
  }

  GetAllUserList() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getAllUser)
        .then(result => {
          this.purchase_order_list = result as User_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<User_list_model>(this.purchase_order_list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', this.purchase_order_list[0].message)
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(()=>{
      this.spinner.hide();
    })
  }

  addUserCreate() {
    var dialogConfig = this.composeDialog.open(UserCreateComponent, {
      data: {flag: 'create'},
      width: '500px'
    });
    dialogConfig.afterClosed().subscribe(
        result => {
          this.GetAllUserList();
    });
  }

}
