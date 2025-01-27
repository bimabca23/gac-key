import { Observable, of } from "rxjs";
import { LoginReq } from "../../types/user/LoginReq";
import { UseCaseFactory, UseCaseFactoryImpl } from "../UseCaseFactory";
import { LoginResp } from "../../types/user/LoginResp";
import { User } from "../../types/user/User";
import { BaseResp } from "../../types/BaseResp";

export interface UserUseCase {
    isLogin(): boolean;
    get(): User;
    login(request: LoginReq): Observable<LoginResp | BaseResp>;
    logout(): void;
}

export class UserUseCaseImpl implements UserUseCase {
    isLogin(): boolean {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();

        return useCaseFactory.session().get("user") !== null;
    }

    get(): User {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();

        return JSON.parse(useCaseFactory.session().get("user"));
    }

    login(request: LoginReq): Observable<LoginResp | BaseResp> {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
        const userList: User[] = [
            {
                name: "Bima Tribuana Putra",
                initial: "BTP",
                role: "Security Operation Center",
            },
            {
                name: "Abraham Nugroho",
                initial: "ABR",
                role: "Shift Leader",
            },
            {
                name: "Ahmad Hendra Marfiadi",
                initial: "AHM",
                role: "Site Manager",
            },
        ];
        const selectedUser: User[] = userList.filter(
            (user) => user.initial === request.initial.trim().toUpperCase()
        );

        if (selectedUser.length === 1) {
            const response: LoginResp = {
                errorSchema: {
                    errorCode: 200,
                    errorMessage: "OK",
                },
                outputSchema: selectedUser[0],
            };
            useCaseFactory
                .session()
                .set("user", JSON.stringify(selectedUser[0]));
            return of(response);
        }

        const response: BaseResp = {
            errorSchema: {
                errorCode: 400,
                errorMessage: "User Not Found",
            },
        };

        return of(response);
    }

    logout(): void {
        const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();

        useCaseFactory.session().unset("user");
    }
}
