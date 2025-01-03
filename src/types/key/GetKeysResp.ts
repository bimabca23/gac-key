import { BaseResp } from "../BaseResp";
import { Key } from "./Key";

export interface GetKeysResp extends BaseResp {
    outputSchema: Key[];
}
