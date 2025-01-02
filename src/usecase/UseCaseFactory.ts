import {
  GetHistorysUseCase,
  GetHistorysUseCaseImpl,
} from "./history/GetHistorysUseCase";
import { GetKeysUseCase, GetKeysUseCaseImpl } from "./key/GetKeysUseCase";
import { GetPicsUseCase, GetPicsUseCaseImpl } from "./pic/GetPicsUseCase";

export interface UseCaseFactory {
  getKeys(): GetKeysUseCase;
  getHistorys(): GetHistorysUseCase;
  getPics(): GetPicsUseCase;
}

export class UseCaseFactoryImpl implements UseCaseFactory {
  getKeys(): GetKeysUseCase {
    return new GetKeysUseCaseImpl();
  }
  getHistorys(): GetHistorysUseCase {
    return new GetHistorysUseCaseImpl();
  }
  getPics(): GetPicsUseCase {
    return new GetPicsUseCaseImpl();
  }
}
