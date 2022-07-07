import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {SessionManageMent} from "../../../../@pristinebase/Process/SessionManageMent";
import {ValidateResponse} from "../../../../@pristinebase/Process/ValidateResponse";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {roleDetailModel, Rolemodel} from "../../../Model/SetupModel";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {DeleteRolemasterDailogComponent} from "../../../../@pristinebase/components/delete-rolemaster-dailog/delete-rolemaster-dailog.component";
import {PristineConfirmDialogInputComponent} from "../../../../@pristinebase/components/confirm-dialog-input/confirm-dialog-input.component";
import {PromiseResponse} from "../../../Model/PromiseResponse";

@Component({
    selector: 'roleMaster',
    templateUrl: './RoleMaster.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./RoleMaster.component.scss']
})
export class RoleMasterComponent implements OnInit, OnDestroy {
    RoleData: Array<roleDetailModel> = [];
    role_name: string;
    role_Id: string;
    RolePermissionDetail: Array<Rolemodel> = [];
    loading: boolean = false;

    constructor(private validateResponse: ValidateResponse, private sessionManageMent: SessionManageMent,
                public composeDialog: MatDialog, private encryptdecrypt: EncriptDecript,
                private pristineToaster: PristineToaster, private webApiHttp: WebApiHttp) {

    }

    ngOnInit() {
        const PostJson = {
            flag: "select"
        };
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.RoleMasterProcess, PostJson)
                .then(result => {
                    let response: Array<{ condition: string, message: string }> = result;
                    if (response.length > 0 && response[0].condition.toLowerCase() == 'true') {
                        this.RoleData = result as roleDetailModel[]
                    } else {
                        this.pristineToaster.onError('error', 'data not found')
                    }

                }, error => {
                   // console.log(error)
                })
        } catch (e) {
            //console.log(e)
        }

    }

    AddRoleMaster() {
        const dialogRef = this.composeDialog.open(PristineConfirmDialogInputComponent);
        dialogRef.componentInstance.confirmMessage = 'Add Role';
        dialogRef.componentInstance.inputFieldMessage = 'Role Name';
        dialogRef.afterClosed().subscribe((result: PromiseResponse) => {
            if (result.condition.toLowerCase() == 'true') {
                const PostJson = {
                    flag: "insert",
                    roleName: result.message,
                    userId: this.encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID'))
                };
                try {
                    this.webApiHttp.Post(this.webApiHttp.ApiURLArray.RoleMasterProcess, PostJson)
                        .then(result => {
                            let response: Array<{ condition: string, message: string }> = result;
                            if (response.length > 0 && response[0].condition.toLowerCase() == 'true') {
                                this.pristineToaster.onSuccess('success', 'Role Added Successfully');
                                this.ngOnInit()
                            } else {
                                this.pristineToaster.onError('error', response[0].message)
                            }
                        }, error => {
                            //console.log(error)
                        })
                } catch (e) {
                   // console.log(e);
                }
            } else {
                //this.pristineToaster.onError('error', '')
            }
        });

    }

    DeleteRole(roleId: number) {
        const dialogRef = this.composeDialog.open(DeleteRolemasterDailogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                const postJson = {
                    flag: "delete",
                    roleId: roleId
                };
                try {
                    this.webApiHttp.Post(this.webApiHttp.ApiURLArray.RoleMasterProcess, postJson)
                        .then(result => {
                            let response: Array<{ condition: string, message: string }> = result;
                            if (response.length > 0 && response[0].condition.toLowerCase() == 'true') {
                                this.pristineToaster.onSuccess('success', 'Role Deleted Successfully');
                                this.ngOnInit();
                            } else {
                                this.pristineToaster.onError('error', response[0].message)
                            }
                        }, error => {
                           // console.log(error)
                        })
                } catch (e) {
                    //console.log(e);
                }
            }
        })

    }

    clickonChips(role_id: any, role_name: string) {
        this.loading = true;
        this.webApiHttp.Get(this.webApiHttp.ApiURLArray.RolePermissionDetail + role_id)
            .then(result => {
                this.RolePermissionDetail = result as Rolemodel[];
                this.role_name = role_name;
                this.role_Id = role_id;
                this.loading = false;
            });
    }

    getStatusParent(data: Rolemodel) {
       // console.log(data)

    }

    getStatus(data: Rolemodel) {
        //console.log(data)
        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].check == 1) {
                return true
            }
        }
        return false
    }

    clickParentNode(event, index: number) {
        if (event.checked) {
            for (var i = 0; i < this.RolePermissionDetail[index].children.length; i++) {
                this.RolePermissionDetail[index].children[i].check = 1;
            }
        }
    }

    SubmitRoleMaster() {
        var temdata: Array<{}> = [];
        for (let i = 0; i < this.RolePermissionDetail.length; i++) {
            var verifyparent: boolean = false;
            for (let j = 0; j < this.RolePermissionDetail[i].children.length; j++) {
                if (this.RolePermissionDetail[i].children[j].check == 1) {
                    verifyparent = true;
                    temdata.push(this.RolePermissionDetail[i].children[j].page_id.toString())
                }
            }
            if (verifyparent)
                temdata.push(this.RolePermissionDetail[i].parent_page_id.toString())
        }
        const postedjson = {
            RoleId: this.role_Id,
            PageId: temdata
        };
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.RolePermissionUpdate, postedjson)
                .then(result => {
                   // console.log(result);
                    let response: Array<{ condition: string; message: string }> = result;
                    if (response[0].condition.toLowerCase() == 'true') {
                        this.pristineToaster.onSuccess('', response[0].message);
                        this.ngOnInit();
                    } else {
                        this.pristineToaster.onError('Error', response[0].message)
                    }
                }, error => {
                   // console.log(error)
                })
        } catch (e) {
           // console.log(e);
        }

    }

    ngOnDestroy(): void {

    }
}


