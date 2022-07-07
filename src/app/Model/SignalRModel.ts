import {BehaviorSubject} from "rxjs";

export const  receiverData = new BehaviorSubject<ReceiveResponseMessageModel>(null);
export interface ReceiveResponseMessageModel {
    connectionID: string;
    action: string;
    message: string;
}
