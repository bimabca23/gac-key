import { Observable, of } from "rxjs";
import { GetPicsResp } from "../../types/pic/GetPicsResp";
import { Pic } from "../../types/pic/Pic";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";

export interface GetPicsUseCase {
    execute(): Observable<GetPicsResp>;
}

export class GetPicsUseCaseImpl implements GetPicsUseCase {
    execute(): Observable<GetPicsResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const response: GetPicsResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: [],
        };
        const picList: Pic[] = [
            {
                id: 1,
                rfid: "0002701424",
                name: "Grevalby",
                initial: "GVB",
            },
            {
                id: 2,
                rfid: "0002753072",
                name: "Dailami Firdaus",
                initial: "DAI",
            },
            {
                id: 3,
                rfid: "0010959554",
                name: "Andreas Gunawan",
                initial: "AGU",
            },
        ];
        if (useCaseFactory.session().get("picList")) {
            return of({
                ...response,
                outputSchema: JSON.parse(
                    useCaseFactory.session().get("picList")
                ) as Pic[],
            });
        } else {
            useCaseFactory.session().set("picList", JSON.stringify(picList));
            return of({ ...response, outputSchema: picList });
        }
    }
}
