import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PurchaseOrderListModule} from "./purchase-order-list.module";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Purchase_order_list_model} from "./purchase_order_list_model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {

  dataSource : MatTableDataSource<PurchaseOrderListModule> = new MatTableDataSource<PurchaseOrderListModule>([]);
  purchase_order_list: Array<Purchase_order_list_model> = [];
  displayColumn: string[] = ["purchaseOrderNo", "documentType" , "orderDate", "name" , "address" , "View"]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public WebApiHttp: WebApiHttp,
              public _toasterService: PristineToaster,
              private spinner: NgxSpinnerService,
              private composeDialog: MatDialog,
              private _router: Router,
              public  fb: FormBuilder,
              private _encryptdecrypt: EncriptDecript) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Purchase_order_list_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetPurchaseOrderData();
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

  GetPurchaseOrderData() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPoHeader +
        this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')) + '&status=PENDING')
        .then(result => {
          this.purchase_order_list = result as Purchase_order_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<Purchase_order_list_model>(this.purchase_order_list);
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

  ViewPurchaseOrder(row_element : any){
    this._router.navigate(['/purchase/purchase_order_list/view_purchase_order',{response:this._encryptdecrypt.encrypt(JSON.stringify(row_element))}])
  }


}
