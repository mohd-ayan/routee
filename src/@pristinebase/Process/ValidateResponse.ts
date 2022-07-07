import {isArray} from "rxjs/internal-compatibility";

export class ValidateResponse {
    checkArray<T>(data: T): boolean {
        if (isArray(data))
            return true;
        else
            return false;
    }

    checkArrayResponseCondition<T>(data: T): boolean {
        try {
            return data[0].condition.toLowerCase() == 'true' ? true : false;
        } catch (e) {
            return undefined;
        }
    }

    checkObjectResponseCondition(data: any): boolean {
        try {
            return data.condition.toLowerCase() == 'true' ? true : false;
        } catch (e) {
            return undefined;
        }
    }
}
