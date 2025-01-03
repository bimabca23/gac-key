import { Observable, of } from "rxjs";
import { ReturnReq } from "../../types/return/ReturnReq";
import { ReturnResp } from "../../types/return/ReturnResp";

export interface ReturnUseCase {
  execute(request: ReturnReq): Observable<ReturnResp>;
}

export class ReturnUseCaseImpl implements ReturnUseCase {
  execute(request: ReturnReq): Observable<ReturnResp> {
    const dummy: ReturnResp = {
      errorSchema: {
        errorCode: 200,
        errorMessage: "OK",
      },
      outputSchema: request.historyList.map((history) => {
        return {
          id: history.id,
          passId: history.passId,
          key: history.key,
          purpose: history.purpose,
          borrowTime: history.borrowTime,
          borrowPic: history.borrowPic,
          borrowSoc: history.borrowSoc,
          returnTime: request.time,
          returnPic: request.initial,
          returnSoc: "BTP",
          status: "Inactive",
        };
      }),
    };
    return of(dummy);
  }
}
