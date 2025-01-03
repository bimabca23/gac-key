import { BorrowUseCase, BorrowUseCaseImpl } from "./borrow/BorrowUseCase";
import {
    GetHistorysUseCase,
    GetHistorysUseCaseImpl,
} from "./history/GetHistorysUseCase";
import { GetKeysUseCase, GetKeysUseCaseImpl } from "./key/GetKeysUseCase";
import { GetPicsUseCase, GetPicsUseCaseImpl } from "./pic/GetPicsUseCase";
import { ReturnUseCase, ReturnUseCaseImpl } from "./return/ReturnUseCase";

export interface UseCaseFactory {
    getKeys(): GetKeysUseCase;
    getHistorys(): GetHistorysUseCase;
    getPics(): GetPicsUseCase;
    borrow(): BorrowUseCase;
    return(): ReturnUseCase;
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
    borrow(): BorrowUseCase {
        return new BorrowUseCaseImpl();
    }
    return(): ReturnUseCase {
        return new ReturnUseCaseImpl();
    }
}
