import { Observable, of } from "rxjs";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";
import { AddKeyReq } from "../../types/key/AddKeyReq";
import { AddKeyResp } from "../../types/key/AddKeyResp";
import { Key } from "../../types/key/Key";

export interface AddKeyUseCase {
    execute(request: AddKeyReq): Observable<AddKeyResp>;
}

export class AddKeyUseCaseImpl implements AddKeyUseCase {
    execute(request: AddKeyReq): Observable<AddKeyResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const keyList: Key[] = JSON.parse(
            useCaseFactory.session().get("keyList")
        );
        const newKey: Key = {
            id: keyList.length + 1,
            rfid: request.rfid,
            type: request.type,
            name: request.name,
            room: request.room,
            quantity: request.quantity,
            location: request.location,
        };
        const response: AddKeyResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: newKey,
        };

        useCaseFactory
            .session()
            .set("keyList", JSON.stringify(keyList.concat(newKey)));
        return of(response);
    }
}
