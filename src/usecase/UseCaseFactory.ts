import { GetKeysUseCase, GetKeysUseCaseImpl } from "./key/GetKeysUseCase";

export interface UseCaseFactory {
  getKeys(): GetKeysUseCase;
}

export class UseCaseFactoryImpl implements UseCaseFactory {
  getKeys(): GetKeysUseCase {
    return new GetKeysUseCaseImpl();
  }
}
