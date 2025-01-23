export interface AddKeyReq {
    rfid: "No" | string;
    type: "Main" | "Spare";
    name: string;
    room: string;
    quantity: number;
    location: string;
}
