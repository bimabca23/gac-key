import { BaseResp } from "../BaseResp";
import { History } from "./History";

export interface GetHistorysResp extends BaseResp {
  outputSchema: History[];
}
