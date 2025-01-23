import { BaseResp } from "../BaseResp";
import { Key } from "./Key";

export interface AddKeyResp extends BaseResp {
    outputSchema: Key;
}
