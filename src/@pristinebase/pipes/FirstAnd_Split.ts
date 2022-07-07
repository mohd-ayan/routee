import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'firstAnd_Split'})
export class FirstAnd_Split implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    transform(value: string): string {
        try {
            return value.replace(/_/gi, " ").charAt(0).toUpperCase() + value.replace(/_/gi, " ").slice(1);
        } catch (e) {
            return value;
        }
    }
}
