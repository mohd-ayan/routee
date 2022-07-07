import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Purchase_logs_list_model} from "./purchase_logs_list_model";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";

@Component({
  selector: 'app-purchase-logs-list',
  templateUrl: './purchase-logs-list.component.html',
  styleUrls: ['./purchase-logs-list.component.scss']
})
export class PurchaseLogsListComponent implements OnInit {

  dataSource : MatTableDataSource<Purchase_logs_list_model> = new MatTableDataSource<Purchase_logs_list_model>([]);
  purchase_order_list: Array<Purchase_logs_list_model> = [];
  displayColumn: string[] = ["buyFromVendorNo" ,"purchaseOrderNo",  "barcode", "startBarcodeSeries" , "endBarcodeSeries" , "quantity"]
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
    this.dataSource = new MatTableDataSource<Purchase_logs_list_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetPurchaseOrderLog();
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

  GetPurchaseOrderLog() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPurchaseOrderLog)
        .then(result => {
          this.purchase_order_list = result as Purchase_logs_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<Purchase_logs_list_model>(this.purchase_order_list);
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

  DownloadPurchaseOrderLog(){

    var temppoline: Array<any> = [];
    for (var i = 0; i < this.dataSource.data.length; i++) {

      var json = {
        BuyFromVendorNo: this.dataSource.data[i].buyFromVendorNo,
        PurchaseOrderNo: this.dataSource.data[i].purchaseOrderNo,
        Barcode: this.dataSource.data[i].barcode,
        Quantity: this.dataSource.data[i].quantity,
        StartBarcodeSeries: this.dataSource.data[i].startBarcodeSeries,
        EndBarcodeSeries: this.dataSource.data[i].endBarcodeSeries,
      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'PurOrdLog_'+temppoline[0].PurchaseOrderNo);

  }

}
