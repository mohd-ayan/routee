import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";

@Pipe({name: 'dropdownfilter'})
export class Dropdownsearch implements PipeTransform {
  /**
   * Transform
   *
   * @param {string} value
   * @param {any[]} args
   * @returns {string}
   */
  transform(items: Array<any>,filterValue: string, keyName: string) {
    if (!items) {
      return [];
    }
    if (!filterValue) {
      return items;
    }
    return _.filter(items, field => {
      if(field[keyName]==null)
        return false;
      else
      return field[keyName].toLowerCase().indexOf(filterValue.toLowerCase()) > -1
    })
  }
}
