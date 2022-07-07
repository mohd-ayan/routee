import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WebApiHttp} from "../../../../../../@pristinebase/Process/WebApiHttp.services";
import {PristineToaster} from "../../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {EncriptDecript} from "../../../../../../@pristinebase/Process/EncriptDecript";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-otp-request-popup',
  templateUrl: './otp-request-popup.component.html',
  styleUrls: ['./otp-request-popup.component.scss']
})
export class OtpRequestPopupComponent implements OnInit {

  otp_password = new FormControl();
  password = new FormControl();
  re_password = new FormControl();



  constructor(
      public dialogRef: MatDialogRef<OtpRequestPopupComponent>,
      public webApiHttp: WebApiHttp,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private pristineToaster: PristineToaster,
      private spinner: NgxSpinnerService,
      private router: Router,
      public _encryptdecrypt: EncriptDecript,) {

  }

  ngOnInit() {
    this.password.setValue('');
    this.re_password.setValue('');
  }

  check_space_key(event){

    if (event.keyCode == 32){
      console.log(event.keyCode)
      return false;
    }
  }

  OnSubmitHit() {
    if (this.otp_password.value == '' || this.otp_password.value == undefined || this.otp_password.value == null) {
      this.pristineToaster.onError("Error", "please fill otp password.");
      return;
    }
    if (this.password.value == '' || this.password.value == undefined || this.password.value == null) {
      this.pristineToaster.onError("Error", "please fill new password.");
      return;
    }
    if (this.password.value.length < 4 ) {
      this.pristineToaster.onError("Error", "password must be greater than four characters.");
      return;
    }
    if (this.re_password.value == '' || this.re_password.value == undefined || this.re_password.value == null) {
      this.pristineToaster.onError("Error", "please fill re-password.");
      return;
    }
    if (this.otp_password.value != this.data.otp_password) {
      this.pristineToaster.onError("Error", "otp is wrong.");
      return;
    }
    if (this.password.value != this.re_password.value) {
      this.pristineToaster.onError("Error", "password does not match with re-password.");
      return;
    }
    let json = {
      Email: this.data.vendor_code,
      otp_password: this.otp_password.value,
      password: this.re_password.value,
      flag: 'PasswordSend'
    }
    this.spinner.show();
    this.webApiHttp.Post(this.webApiHttp.ApiURLArray.forgetpassword, json).then(
        (resut: Array<{
          condition: string;
          message: string;
        }>) => {
          if (resut.length > 0 && resut[0].condition.toLowerCase() == 'true') {
            this.pristineToaster.onSuccess("Success", resut[0].message);
          } else {
            this.pristineToaster.onError("Error", resut[0].message);
          }
        }
    ).catch(ee => {
      this.pristineToaster.onError("Error", ee.message);
      this.spinner.hide();
    }).finally(() => {
      this.spinner.hide();
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
