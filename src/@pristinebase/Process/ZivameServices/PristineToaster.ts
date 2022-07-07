import {Injectable} from '@angular/core';
import {ToastrService, IndividualConfig} from 'ngx-toastr';

@Injectable()
export class PristineToaster {

    options: IndividualConfig;

    //todo position of toaster
    // Toast Position
    // Top Right
    // Bottom Right
    // Bottom Left
    // Top Left
    // Top Full Width
    // Bottom Full Width
    // Top Center
    // Bottom Center
    constructor(
        private toastr: ToastrService
    ) {
        this.options = this.toastr.toastrConfig;
        this.options.positionClass = 'toast-top-right';
        this.options.progressAnimation = 'decreasing';
        this.options.progressBar = true;
        this.options.tapToDismiss = false;
        this.options.timeOut = 10000;
    }

//todo type ["success","error","info","warning"]
    showToast(title, message, type) {
        this.toastr.show(message, title, this.options, 'toast-' + type);
    }

    onSuccess(title, message) {
        this.toastr.success(message, title, this.options)
    }

    onError(title, message) {
        this.toastr.error(message, title, this.options);
    }

    onInfo(title, message) {
        this.toastr.info(message, title, this.options);
    }

    onWarning(title, message) {
        this.toastr.warning(message, title, this.options);
    }
}
