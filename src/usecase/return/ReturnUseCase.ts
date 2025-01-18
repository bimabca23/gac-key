import { Observable, of } from "rxjs";
import { History } from "../../types/history/History";
import { ReturnReq } from "../../types/return/ReturnReq";
import { ReturnResp } from "../../types/return/ReturnResp";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";

export interface ReturnUseCase {
    execute(request: ReturnReq): Observable<ReturnResp>;
}

export class ReturnUseCaseImpl implements ReturnUseCase {
    execute(request: ReturnReq): Observable<ReturnResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const historyList: History[] = JSON.parse(
            useCaseFactory.session().get("historyList")
        ) as History[];
        const updatedHistoryList: History[] = historyList.map((history) => {
            if (request.historyIdList.includes(history.id)) {
                return {
                    ...history,
                    returnTime: request.time,
                    returnPic: request.initial,
                    returnSoc: "BTP",
                    status: "Inactive",
                };
            } else {
                return history;
            }
        });
        const response: ReturnResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: updatedHistoryList,
        };

        useCaseFactory
            .session()
            .set("historyList", JSON.stringify(updatedHistoryList));
        return of(response);
    }
}
