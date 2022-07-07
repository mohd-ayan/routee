import {Pipe, PipeTransform} from '@angular/core';
import {AllPickerModel} from "../../app/Model/ShiftModel";

@Pipe({name: 'forceAssignment'})
export class ForceAssignment implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    transform(alldata: Array<AllPickerModel>, rowdataSelected: Array<string>): AllPickerModel[] {
        try {
            //console.log(alldata);
            var data = alldata.filter(rowObject => {
                if (rowObject.selectedbyUser == false || rowObject.selectedbyUser == undefined) {
                    return true;
                }
                return false;
            });
            //console.log(data);
            return data;
        } catch (e) {
            return alldata;
        }
    }
}
