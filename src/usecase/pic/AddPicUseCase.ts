import { Observable, of } from "rxjs";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";
import { AddPicReq } from "../../types/pic/AddPicReq";
import { AddPicResp } from "../../types/pic/AddPicResp";
import { Pic } from "../../types/pic/Pic";

export interface AddPicUseCase {
    execute(request: AddPicReq): Observable<AddPicResp>;
}

export class AddPicUseCaseImpl implements AddPicUseCase {
    execute(request: AddPicReq): Observable<AddPicResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const picList: Pic[] = JSON.parse(
            useCaseFactory.session().get("picList")
        );
        const newPic: Pic = {
            id: picList.length + 1,
            rfid: request.rfid,
            name: request.name,
            initial: request.initial,
        };
        const response: AddPicResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: newPic,
        };

        useCaseFactory
            .session()
            .set("picList", JSON.stringify(picList.concat(newPic)));
        return of(response);
    }
}
