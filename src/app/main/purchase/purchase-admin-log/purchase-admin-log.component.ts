import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PurchaseOrderListModule} from "../purchase-order-list/purchase-order-list.module";
import {Purchase_order_list_model} from "../purchase-order-list/purchase_order_list_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Purchase_admin_log_model} from "./purchase_admin_log_model";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";

@Component({
  selector: 'app-purchase-admin-log',
  templateUrl: './purchase-admin-log.component.html',
  styleUrls: ['./purchase-admin-log.component.scss']
})
export class PurchaseAdminLogComponent implements OnInit {

  dataSource : MatTableDataSource<Purchase_admin_log_model> = new MatTableDataSource<Purchase_admin_log_model>([]);
  purchase_order_list: Array<Purchase_admin_log_model> = [];
  displayColumn: string[] = ["purchaseOrderNo", "barcode" , "quantity", "remarks", "created_by","created_on"]
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
    this.dataSource = new MatTableDataSource<Purchase_admin_log_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetPurchaseOrderAdminLog();
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

  GetPurchaseOrderAdminLog() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPurchaseOrderAdminLog)
        .then(result => {
          this.purchase_order_list = result as Purchase_admin_log_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<Purchase_admin_log_model>(this.purchase_order_list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', 'Data Not Found')
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(()=>{
      this.spinner.hide();
    })
  }


  DownloadPurchaseOrderAdminLog(){

    var temppoline: Array<any> = [];
    for (var i = 0; i < this.dataSource.data.length; i++) {

      var json = {
        PurchaseOrderNo: this.dataSource.data[i].purchaseOrderNo,
        Barcode: this.dataSource.data[i].barcode,
        Quantity: this.dataSource.data[i].quantity,
        Remarks: this.dataSource.data[i].remarks,
        CreatedBy: this.dataSource.data[i].created_by,
        CreatedOn: this.dataSource.data[i].created_on
      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'PurOrdAdmin_'+temppoline[0].PurchaseOrderNo);

  }

}
