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

@Component({
  selector: 'app-all-purchase-order-list',
  templateUrl: './all-purchase-order-list.component.html',
  styleUrls: ['./all-purchase-order-list.component.scss']
})
export class AllPurchaseOrderListComponent implements OnInit {

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
    this.GetAllPurchaseOrderData();
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

  GetAllPurchaseOrderData() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getAllPoHeader)
        .then(result => {
          this.purchase_order_list = result as Purchase_order_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition=='True') {
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
    this._router.navigate(['/purchase/all_purchase_order_list/admin_view_purchase_order',{response:this._encryptdecrypt.encrypt(JSON.stringify(row_element))}])
  }

}
