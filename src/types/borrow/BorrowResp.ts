import { BaseResp } from "../BaseResp";
import { History } from "../history/History";

export interface BorrowResp extends BaseResp {
    outputSchema: History[];
}
