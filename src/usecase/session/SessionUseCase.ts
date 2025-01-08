export interface SessionUseCase {
    get(key: string): any;
    set(key: string, value: string): void;
    unset(key: string): void;
    clear(): void;
}

export class SessionUseCaseImpl implements SessionUseCase {
    get(key: string) {
        return sessionStorage.getItem(key);
    }
    set(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }
    unset(key: string): void {
        sessionStorage.removeItem(key);
    }
    clear(): void {
        sessionStorage.clear();
    }
}
