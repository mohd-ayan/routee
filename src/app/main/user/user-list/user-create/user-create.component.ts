import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  code = new FormControl();
  name = new FormControl();
  phoneno = new FormControl('');
  email = new FormControl();

  constructor(public dialogRef: MatDialogRef<UserCreateComponent>,
              public webApiHttp: WebApiHttp,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private pristineToaster: PristineToaster,
              private spinner: NgxSpinnerService,
              private router: Router,
              public _encryptdecrypt: EncriptDecript,) { }

  ngOnInit() {
  }

  OnCreate(){

    if (this.code.value == '' || this.code.value == undefined || this.code.value == null) {
      this.pristineToaster.onError("Error", "please fill code.");
      return;
    }
    if (this.name.value == '' || this.name.value == undefined || this.name.value == null) {
      this.pristineToaster.onError("Error", "please fill name.");
      return;
    }
    if (this.email.value == '' || this.email.value == undefined || this.email.value == null) {
      this.pristineToaster.onError("Error", "please fill email.");
      return;
    }
    if (this.phoneno.value != '') {
      if(this.phoneno.value.toString().length < 10){
        this.pristineToaster.onError("Error", "please fill valid phone no.");
        return;
      }
    }

    let json = {
      vendorCode: this.code.value,
      name: this.name.value,
      phoneNo: this.phoneno.value,
      email: this.email.value,
    }
    this.spinner.show();
    this.webApiHttp.Post(this.webApiHttp.ApiURLArray.createUser, json).then(
        (resut: Array<{
          condition: string;
          message: string;
        }>) => {
          if (resut.length > 0 && resut[0].condition.toLowerCase() == 'true') {
            this.pristineToaster.onSuccess("Success", resut[0].message);
            this.dialogRef.close();
          } else {
            this.pristineToaster.onError("Error", resut[0].message);
          }
        }
    ).catch(ee => {
      this.pristineToaster.onError("Error", ee.message);
      this.spinner.hide();
    }).finally(() => {
      this.spinner.hide();
      // this.dialogRef.close();
    });

  }

}
