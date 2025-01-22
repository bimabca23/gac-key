import { BorrowUseCase, BorrowUseCaseImpl } from "./borrow/BorrowUseCase";
import {
    GetHistorysUseCase,
    GetHistorysUseCaseImpl,
} from "./history/GetHistorysUseCase";
import { GetKeysUseCase, GetKeysUseCaseImpl } from "./key/GetKeysUseCase";
import { AddPicUseCase, AddPicUseCaseImpl } from "./pic/AddPicUseCase";
import { GetPicsUseCase, GetPicsUseCaseImpl } from "./pic/GetPicsUseCase";
import { ReturnUseCase, ReturnUseCaseImpl } from "./return/ReturnUseCase";
import { SessionUseCase, SessionUseCaseImpl } from "./session/SessionUseCase";

export interface UseCaseFactory {
    // Session
    session(): SessionUseCase;
    // Key
    getKeys(): GetKeysUseCase;
    borrow(): BorrowUseCase;
    return(): ReturnUseCase;
    // History
    getHistorys(): GetHistorysUseCase;
    // Pic
    getPics(): GetPicsUseCase;
    addPic(): AddPicUseCase;
}

export class UseCaseFactoryImpl implements UseCaseFactory {
    // Session
    session(): SessionUseCase {
        return new SessionUseCaseImpl();
    }
    // Key
    getKeys(): GetKeysUseCase {
        return new GetKeysUseCaseImpl();
    }
    borrow(): BorrowUseCase {
        return new BorrowUseCaseImpl();
    }
    return(): ReturnUseCase {
        return new ReturnUseCaseImpl();
    }
    // History
    getHistorys(): GetHistorysUseCase {
        return new GetHistorysUseCaseImpl();
    }
    // Pic
    getPics(): GetPicsUseCase {
        return new GetPicsUseCaseImpl();
    }
    addPic(): AddPicUseCase {
        return new AddPicUseCaseImpl();
    }
}
