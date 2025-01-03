import { Observable, of } from "rxjs";
import { BorrowReq } from "../../types/borrow/BorrowReq";
import { BorrowResp } from "../../types/borrow/BorrowResp";

export interface BorrowUseCase {
    execute(request: BorrowReq): Observable<BorrowResp>;
}

export class BorrowUseCaseImpl implements BorrowUseCase {
    execute(request: BorrowReq): Observable<BorrowResp> {
        const dummy: BorrowResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: request.keyList.map((key, index) => {
                return {
                    id: index + 10,
                    passId: request.passId,
                    key: key,
                    purpose: request.purpose,
                    borrowTime: request.time,
                    borrowPic: request.initial,
                    borrowSoc: "BTP",
                    returnTime: "",
                    returnPic: "",
                    returnSoc: "",
                    status: "Active",
                };
            }),
        };
        return of(dummy);
    }
}
