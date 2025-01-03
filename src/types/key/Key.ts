export interface Key {
    id: number;
    rfid: "No" | string;
    type: "Main" | "Spare";
    name: string;
    quantity: number;
    location: string;
    status: "Available" | "Not Available";
}
