import { Observable, of } from "rxjs";
import { GetPicsResp } from "../../types/pic/GetPicsResp";

export interface GetPicsUseCase {
  execute(): Observable<GetPicsResp>;
}

export class GetPicsUseCaseImpl implements GetPicsUseCase {
  execute(): Observable<GetPicsResp> {
    const dummy: GetPicsResp = {
      errorSchema: {
        errorCode: 200,
        errorMessage: "OK",
      },
      outputSchema: [
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
      ],
    };
    return of(dummy);
  }
}
