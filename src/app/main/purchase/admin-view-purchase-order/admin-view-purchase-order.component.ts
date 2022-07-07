import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {po_line_barcode, View_purchase_order_model} from "../view-purchase-order/view_purchase_order_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-admin-view-purchase-order',
  templateUrl: './admin-view-purchase-order.component.html',
  styleUrls: ['./admin-view-purchase-order.component.scss']
})
export class AdminViewPurchaseOrderComponent implements OnInit {

  po_detail: any
  total_reprint:FormControl = new FormControl();
  remarks:FormControl = new FormControl();
  dataSource : MatTableDataSource<View_purchase_order_model> = new MatTableDataSource<View_purchase_order_model>([]);
  purchase_order_list: Array<View_purchase_order_model> = [];
  send_purchase_order_list: Array<po_line_barcode> = [];
  displayColumn: string[] = ["description","barcode", "mrp" , "style", "color" , "size" ,"quantity","customeTolerance", "rePrint",
    "additionalBarcodePrint" , "barcodePrinted" , "remainingBarcodeWithTolerance" , "remainingBarcodeWithoutTolerance"]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public WebApiHttp: WebApiHttp,
              private route: ActivatedRoute,
              private configRef:MatDialog,
              public  _encryptdecrypt: EncriptDecript,
              public _toasterService: PristineToaster,
              private router: Router,
              private spinner: NgxSpinnerService,
              private _excelService: ExcelService,) {
    this.po_detail = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('response')));
  }

  ngOnInit() {
    this.GetPurchaseOrderLineData();
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

  GetPurchaseOrderLineData() {
    this.remarks.setValue('');
    this.total_reprint.setValue('0');
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPoLine + this.po_detail.purchaseOrderNo)
        .then(result => {
          this.purchase_order_list = result as View_purchase_order_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<View_purchase_order_model>(this.purchase_order_list);
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

  rePrint_barcode(row : number){
    let re_print = 0;
    if(this.dataSource.data[row].rePrint<0){
      this.dataSource.data[row].rePrint = 0;
    }
    if(this.dataSource.data[row].rePrint > this.dataSource.data[row].barcodePrinted){
      this.dataSource.data[row].rePrint = this.dataSource.data[row].barcodePrinted;
    }
    for(let i = 0;i<this.dataSource.data.length;i++){
      if(this.dataSource.data[i].rePrint > 0){
        re_print += this.dataSource.data[i].rePrint
      }
    }
    this.total_reprint.setValue(re_print.toString())
  }

  reprint(){
    if(this.remarks.value == undefined || this.remarks.value == null || this.remarks.value == ''){
      this._toasterService.onWarning('warning', "Please Fill Remarks");
      return;
    }
    this.send_purchase_order_list = [];
    let id : number = 1
    for(let i = 0;i<this.dataSource.data.length;i++){
      if(this.dataSource.data[i].rePrint>0){
        const json = {
          "id": id,
          "purchaseOrderNo":this.po_detail.purchaseOrderNo,
          "barcode":this.dataSource.data[i].barcode,
          "lineNo":this.dataSource.data[i].lineNo,
          "quantityToPrint":this.dataSource.data[i].rePrint,
          "mrp":this.dataSource.data[i].mrp
        }
        this.send_purchase_order_list.push(json);
        id += 1;
      }
    }
    if(this.send_purchase_order_list.length <= 0){
      this._toasterService.onWarning('warning', "Please Fill Re Print Qty");
      return;
    }
    const json = {
      "remarks":this.remarks.value,
      "created_by":this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      "purchaseOrderLineBarcodes":this.send_purchase_order_list
    }
    this.spinner.show();
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.poLinesRePrintBarcodes,json)
        .then(result => {
          this.purchase_order_list = result as View_purchase_order_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this._toasterService.onSuccess('success', this.purchase_order_list[0].message)
            this.spinner.hide();
            this.GetPurchaseOrderLineData();
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

  DownloadPurchaseOrder(){

    var temppoline: Array<any> = [];
    for (var i = 0; i < this.dataSource.data.length; i++) {

      var json = {
        BuyFromVendorNo: this.dataSource.data[i].buyFromVendorNo,
        PurchaseOrderNo: this.dataSource.data[i].purchaseOrderNo,
        Barcode: this.dataSource.data[i].barcode,
        Description2: this.dataSource.data[i].description,
        Size: this.dataSource.data[i].size,
        Style: this.dataSource.data[i].style,
        Color: this.dataSource.data[i].color,
        mch1: this.dataSource.data[i].mch1,
        mch2: this.dataSource.data[i].mch2,
        mch3: this.dataSource.data[i].mch3,
        Order_Quantity: this.dataSource.data[i].quantity,
        BarcodePrinted: this.dataSource.data[i].barcodePrinted,
      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'PurOrd_'+temppoline[0].PurchaseOrderNo);

  }

}
