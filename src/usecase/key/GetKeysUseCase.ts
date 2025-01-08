import { Observable, of } from "rxjs";
import { GetKeysResp } from "../../types/key/GetKeysResp";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";
import { Key } from "../../types/key/Key";

export interface GetKeysUseCase {
    execute(): Observable<GetKeysResp>;
}

export class GetKeysUseCaseImpl implements GetKeysUseCase {
    execute(): Observable<GetKeysResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const response: GetKeysResp = {
            errorSchema: {
                errorCode: 200,
                errorMessage: "OK",
            },
            outputSchema: [],
        };
        const keyList: Key[] = [
            {
                id: 1,
                rfid: "0000120709",
                type: "Main",
                name: "DH1 1.7",
                quantity: 1,
                location: "Rack Putih 1",
            },
            {
                id: 2,
                rfid: "0000196536",
                type: "Main",
                name: "DH2 2.30",
                quantity: 1,
                location: "Rack Putih 2",
            },
            {
                id: 3,
                rfid: "0000202273",
                type: "Main",
                name: "UPS 3A01",
                quantity: 1,
                location: "Rack Putih 3",
            },
            {
                id: 4,
                rfid: "0000212669",
                type: "Main",
                name: "ANTE DL1A01",
                quantity: 1,
                location: "Rack Putih 4",
            },
            {
                id: 5,
                rfid: "0000855274",
                type: "Main",
                name: "BUFFER DL101",
                quantity: 1,
                location: "Rack Putih 5",
            },
            {
                id: 6,
                rfid: "0000861771",
                type: "Spare",
                name: "DH1 1.7",
                quantity: 2,
                location: "Rack Hitam 1",
            },
            {
                id: 7,
                rfid: "0000879070",
                type: "Spare",
                name: "DH2 2.30",
                quantity: 2,
                location: "Rack Hitam 2",
            },
            {
                id: 8,
                rfid: "0000895520",
                type: "Spare",
                name: "UPS 3A01",
                quantity: 3,
                location: "Rack Hitam 3",
            },
            {
                id: 9,
                rfid: "0000900171",
                type: "Spare",
                name: "ANTE DL1A01",
                quantity: 3,
                location: "Rack Hitam 4",
            },
            {
                id: 10,
                rfid: "0000918076",
                type: "Spare",
                name: "BUFFER DL101",
                quantity: 1,
                location: "Rack Hitam 5",
            },
        ];

        if (useCaseFactory.session().get("keyList")) {
            return of({
                ...response,
                outputSchema: JSON.parse(
                    useCaseFactory.session().get("keyList")
                ) as Key[],
            });
        } else {
            useCaseFactory.session().set("keyList", JSON.stringify(keyList));
            return of({ ...response, outputSchema: keyList });
        }
    }
}
