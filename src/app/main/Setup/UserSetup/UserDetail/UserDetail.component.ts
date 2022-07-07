import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {pristineAnimations} from '@pristinebase/animations';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {LocalDataSource} from "ng2-smart-table";
import {AllUserModel} from "../../../../Model/UserSetupModel";
import {MatDialog} from "@angular/material/dialog";
import {createUserDialogComponent} from "../CreateUser-dialog/CreateUser-dialog.component";
import {PristineConfirmDialogInputComponent} from "../../../../../@pristinebase/components/confirm-dialog-input/confirm-dialog-input.component";
import {PromiseResponse} from "../../../../Model/PromiseResponse";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {ExcelService} from "../../../../../@pristinebase/Process/excel.Service";
import {changeIPDialogComponent} from "../ChangeIP-dialog/ChangeIP-dialog.component";

@Component({
    selector: 'UserDetail',
    templateUrl: './UserDetail.component.html',
    styleUrls: ['./UserDetail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class UserDetailComponent implements OnInit {
    AllUserDataSource: LocalDataSource = new LocalDataSource();
    UserData = {
        actions: {
            add: false,
            edit: true,
            delete: true,
            position: 'right'

        },
        mode: 'external',
        setPage: false,
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit">edit</i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i>print</i>',
        },
        columns: {
            name: {
                title: 'Name',
                type: 'string',
                filter: true
            },
            email: {
                title: 'Email Id ',
                type: 'string',
                filter: true
            },
            roleId: {
                title: 'Role',
                type: 'string',
                filter: true
            },
            workType: {
                title: 'Work Type',
                type: 'string',
                filter: true
            },
        },

    };

    AllUserData: Array<AllUserModel> = [];

    constructor(private webapiHttp: WebApiHttp, public composeDialog: MatDialog,
                public pristineToaster: PristineToaster, public excelService: ExcelService) {
    }

    ngOnInit(): void {
        try {
            this.webapiHttp.Get(this.webapiHttp.ApiURLArray.GetAllUser)
                .then(result => {
                    this.AllUserData = result as AllUserModel[];
                    this.AllUserDataSource.load(this.AllUserData)
                }, error => {
                    //console.log(error)
                })
        } catch (e) {
            //console.log(e)
        }
    }

    AddUserDetail() {
        const dailogRef = this.composeDialog.open(createUserDialogComponent, {
            width: '600px'
        });
        dailogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        })

    }

    EditUser(data) {
        const dialogRef = this.composeDialog.open(PristineConfirmDialogInputComponent);
        dialogRef.componentInstance.inputFieldMessage = 'Enter New Password';
        dialogRef.componentInstance.confirmMessage = 'Change Password';
        dialogRef.componentInstance.addbutton = 'Update';
        dialogRef.afterClosed().subscribe((result: PromiseResponse) => {
            if (result.condition == 'true') {
                const json = {
                    Email: data.data.email,
                    password: result.message
                };
                try {
                    this.webapiHttp.Post(this.webapiHttp.ApiURLArray.UpdateUserPassword, json)
                        .then(result => {
                            //console.log(result);
                            let response: Array<{ condition: string; message: string }> = result;
                            if (response[0].condition.toLowerCase() == 'true') {
                                this.pristineToaster.onSuccess('', response[0].message);
                                this.ngOnInit();
                            } else {
                                this.pristineToaster.onError('error', response[0].message)
                            }
                        }, error => {
                            //console.log(error)
                        })
                } catch (e) {
                    // console.log(e)
                }
            }
        })
    }

    downloadExcel() {
        for (let i = 0; i < this.AllUserData.length; i++) {
            delete this.AllUserData[i].condition
        }
        this.excelService.exportAsExcelFile(this.AllUserData, 'UserData')
    }

    onIPchange(data: any) {
        const ipchange = this.composeDialog.open(changeIPDialogComponent, {width: '400px'});
        if (data.data.printerIP == null || data.data.printerIP == '') {
            ipchange.componentInstance.ipcontrol.setValue('192.168.1.1');
            ipchange.componentInstance.portcontrol.setValue(9100);
        } else {
            ipchange.componentInstance.ipcontrol.setValue(data.data.printerIP);
            ipchange.componentInstance.portcontrol.setValue(data.data.printerPort);
        }

        ipchange.componentInstance.email = data.data.email;
        ipchange.afterClosed().subscribe((value: boolean) => {
            if (value) {
                this.ngOnInit();
            }
        }, error => {
            this.ngOnInit();
        })
    }
}
