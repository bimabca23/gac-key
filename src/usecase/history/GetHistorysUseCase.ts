import { Observable, of } from "rxjs";
import { GetHistorysResp } from "../../types/history/GetHistorysResp";

export interface GetHistorysUseCase {
  execute(): Observable<GetHistorysResp>;
}

export class GetHistorysUseCaseImpl implements GetHistorysUseCase {
  execute(): Observable<GetHistorysResp> {
    const dummy: GetHistorysResp = {
      errorSchema: {
        errorCode: 200,
        errorMessage: "OK",
      },
      outputSchema: [
        {
          id: 1,
          passId: "44121",
          key: {
            id: 1,
            rfid: "0000120709",
            type: "Main",
            name: "DH1 1.7",
            quantity: 1,
            location: "Rack Putih 1",
            status: "Available",
          },
          purpose: "Perapihan Kabel",
          borrowTime: "2025-01-01T00:15:00.000Z",
          borrowPic: "GVB",
          borrowSoc: "BTP",
          returnTime: "2025-01-01T02:45:00.000Z",
          returnPic: "GVB",
          returnSoc: "BTP",
          status: "Inactive",
        },
        {
          id: 2,
          passId: "44121",
          key: {
            id: 2,
            rfid: "0000196536",
            type: "Main",
            name: "DH2 2.30",
            quantity: 1,
            location: "Rack Putih 2",
            status: "Available",
          },
          purpose: "Perapihan Kabel",
          borrowTime: "2025-01-01T00:15:00.000Z",
          borrowPic: "GVB",
          borrowSoc: "BTP",
          returnTime: "2025-01-01T03:50:00.000Z",
          returnPic: "AGU",
          returnSoc: "BTP",
          status: "Inactive",
        },
        {
          id: 3,
          passId: "44125",
          key: {
            id: 3,
            rfid: "0000202273",
            type: "Main",
            name: "UPS 3A01",
            quantity: 1,
            location: "Rack Putih 3",
            status: "Available",
          },
          purpose: "PM CCTV",
          borrowTime: "2025-01-01T01:15:00.000Z",
          borrowPic: "AGU",
          borrowSoc: "BTP",
          returnTime: "2025-01-01T08:35:00.000Z",
          returnPic: "GVB",
          returnSoc: "HVZ",
          status: "Inactive",
        },
        {
          id: 4,
          passId: "44125",
          key: {
            id: 4,
            rfid: "0000212669",
            type: "Main",
            name: "ANTE DL1A01",
            quantity: 1,
            location: "Rack Putih 4",
            status: "Available",
          },
          purpose: "PM CCTV",
          borrowTime: "2025-01-01T07:45:00.000Z",
          borrowPic: "AGU",
          borrowSoc: "HVZ",
          returnTime: "2025-01-01T08:30:00.000Z",
          returnPic: "GVB",
          returnSoc: "HVZ",
          status: "Inactive",
        },
        {
          id: 5,
          passId: "44125",
          key: {
            id: 5,
            rfid: "0000855274",
            type: "Main",
            name: "BUFFER DL101",
            quantity: 1,
            location: "Rack Putih 5",
            status: "Available",
          },
          purpose: "PM CCTV",
          borrowTime: "2025-01-01T07:45:00.000Z",
          borrowPic: "AGU",
          borrowSoc: "HVZ",
          returnTime: "2025-01-01T09:15:00.000Z",
          returnPic: "AGU",
          returnSoc: "HVZ",
          status: "Inactive",
        },
      ],
    };
    return of(dummy);
  }
}
