export class ShiftModel {
    condition: string;
    id: string;
    shift_name: string;
    start_time: string;
    end_time: string;
    sl: Array<{
        shift_superviser: string;
    }>
}

export class PickZoneModel {
    condition: string;
    zone_id: string;
    zone_type: string;
}

export class AllPickerModel {
    name: string;
    email: string;
    password: string;
    roleId: string;
    shiftID: string;
    condition: string;
    menu: string;
    selectedbyUser: boolean;//todo don't touch this is use in force assignment
    zone: string;//todo don't touch this is use in force assignment
}

export class RosterSubmitHitModel {
    condition: string;
    id: number;
    picker: Array<{ active: number; picker_id: string }>;
    zone: string;

    shift_name: string;
    shift_id: string;
    start_time: string;
    end_time: string;
    message: string;
}


export class ManagerRosterModel {
    condition: string;
    shift_name: string;
    start_time: string;
    end_time: string;
    shift: number;
    work_type: string;
    created_by: string;
    rl: Array<{
        picking_zone: string;
        picker: Array<{
            picker_id: string;
        }>
    }>
}
