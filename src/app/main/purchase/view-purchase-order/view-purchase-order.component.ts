import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {po_line_barcode, View_purchase_order_model} from "./view_purchase_order_model";
import {FormControl, FormControlName} from "@angular/forms";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.scss']
})
export class ViewPurchaseOrderComponent implements OnInit {

  po_detail: any
  tolerance: string;
  sumOfTotalBarcodes:FormControl = new FormControl();
  dataSource : MatTableDataSource<View_purchase_order_model> = new MatTableDataSource<View_purchase_order_model>([]);
  purchase_order_list: Array<View_purchase_order_model> = [];
  send_purchase_order_list: Array<po_line_barcode> = [];
  displayColumn: string[] = ["description","barcode", "mrp" , "style", "color" , "size" ,"quantity", "qtyToPrint","customeTolerance",
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
    this.sumOfTotalBarcodes.setValue('0');
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

  bind_qty_print(row : number){
    let qty_print = 0;
    if(this.dataSource.data[row].qtyToPrint<0){
      this.dataSource.data[row].qtyToPrint = 0;
    }
    if(this.dataSource.data[row].qtyToPrint > this.dataSource.data[row].remainingBarcodeWithTolerance){
      this.dataSource.data[row].qtyToPrint = this.dataSource.data[row].remainingBarcodeWithTolerance;
    }
    for(let i = 0;i<this.dataSource.data.length;i++){
      if(this.dataSource.data[i].qtyToPrint > 0){
        qty_print += this.dataSource.data[i].qtyToPrint
      }
    }
    this.sumOfTotalBarcodes.setValue(qty_print.toString())
  }

  setTolerance(){
    let qty_print = 0;
    if(this.tolerance == undefined || this.tolerance == null || this.tolerance == ''){
      return;
    }

    if(this.tolerance.toLowerCase() == 'reset'){
      for(let i = 0;i<this.dataSource.data.length;i++){
        this.dataSource.data[i].qtyToPrint = 0;
      }
      qty_print = 0;
      this.sumOfTotalBarcodes.setValue(qty_print.toString())
    }else if(this.tolerance.toLowerCase() == 'with tolerance'){
      for(let i = 0;i<this.dataSource.data.length;i++){
        this.dataSource.data[i].qtyToPrint = this.dataSource.data[i].remainingBarcodeWithTolerance;
        qty_print += this.dataSource.data[i].remainingBarcodeWithTolerance;
      }
      this.sumOfTotalBarcodes.setValue(qty_print.toString())
    }else if(this.tolerance.toLowerCase() == 'without tolerance'){
      for(let i = 0;i<this.dataSource.data.length;i++){
        this.dataSource.data[i].qtyToPrint = this.dataSource.data[i].remainingBarcodeWithoutTolerance;
        qty_print += this.dataSource.data[i].remainingBarcodeWithoutTolerance;
      }
      this.sumOfTotalBarcodes.setValue(qty_print.toString())
    }

  }

  print_barcode(){
    this.send_purchase_order_list = [];
    let id : number = 1
    for(let i = 0;i<this.dataSource.data.length;i++){
      if(this.dataSource.data[i].qtyToPrint>0){
        const json = {
          "id": id,
          "purchaseOrderNo":this.po_detail.purchaseOrderNo,
          "barcode":this.dataSource.data[i].barcode,
          "lineNo":this.dataSource.data[i].lineNo,
          "quantityToPrint":this.dataSource.data[i].qtyToPrint,
          "mrp":this.dataSource.data[i].mrp
        }
        this.send_purchase_order_list.push(json);
        id += 1;
      }
    }
    if(this.send_purchase_order_list.length <= 0){
      this._toasterService.onWarning('warning', "Please Fill Qty To Print");
      return;
    }
    const json = {
      "sumOfTotalBarcode":this.sumOfTotalBarcodes.value,
      "purchaseOrderLineBarcodes":this.send_purchase_order_list
    }
    this.spinner.show();
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.purchaseOrderBarcodes,json)
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
