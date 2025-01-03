import { BaseResp } from "../BaseResp";
import { History } from "../history/History";

export interface ReturnResp extends BaseResp {
    outputSchema: History[];
}
