import {
  GetHistorysUseCase,
  GetHistorysUseCaseImpl,
} from "./history/GetHistorysUseCase";
import { GetKeysUseCase, GetKeysUseCaseImpl } from "./key/GetKeysUseCase";

export interface UseCaseFactory {
  getKeys(): GetKeysUseCase;
  getHistorys(): GetHistorysUseCase;
}

export class UseCaseFactoryImpl implements UseCaseFactory {
  getKeys(): GetKeysUseCase {
    return new GetKeysUseCaseImpl();
  }
  getHistorys(): GetHistorysUseCase {
    return new GetHistorysUseCaseImpl();
  }
}
