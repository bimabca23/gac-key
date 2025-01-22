import { BaseResp } from "../BaseResp";
import { Pic } from "./Pic";

export interface AddPicResp extends BaseResp {
    outputSchema: Pic;
}
