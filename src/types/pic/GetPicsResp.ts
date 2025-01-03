import { BaseResp } from "../BaseResp";
import { Pic } from "./Pic";

export interface GetPicsResp extends BaseResp {
    outputSchema: Pic[];
}
