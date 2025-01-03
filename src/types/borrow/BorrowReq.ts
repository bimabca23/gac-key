import { Key } from "../key/Key";

export interface BorrowReq {
    initial: string;
    passId: string;
    purpose: string;
    time: string;
    keyList: Key[];
}
