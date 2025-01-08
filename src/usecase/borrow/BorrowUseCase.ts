import { Observable, of } from "rxjs";
import { BorrowReq } from "../../types/borrow/BorrowReq";
import { BorrowResp } from "../../types/borrow/BorrowResp";
import { Key } from "../../types/key/Key";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";
import { History } from "../../types/history/History";

export interface BorrowUseCase {
    execute(request: BorrowReq): Observable<BorrowResp>;
}

export class BorrowUseCaseImpl implements BorrowUseCase {
    execute(request: BorrowReq): Observable<BorrowResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const keyList: Key[] = JSON.parse(
            useCaseFactory.session().get("keyList")
        ) as Key[];
        const historyList: History[] = JSON.parse(
            useCaseFactory.session().get("historyList")
        ) as History[];
        const newHistoryList: History[] = keyList
            .filter((key) => request.keyIdList.includes(key.id))
            .map((key, index) => {
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
            });
        const response: BorrowResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: newHistoryList,
        };

        useCaseFactory
            .session()
            .set(
                "historyList",
                JSON.stringify(historyList.concat(newHistoryList))
            );
        return of(response);
    }
}
