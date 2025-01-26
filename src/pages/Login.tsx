import {
    Box,
    Button,
    Card,
    CardContent,
    Grid2 as Grid,
    TextField,
} from "@mui/material";
import { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import { LoginReq } from "../types/user/LoginReq";
import { BaseResp } from "../types/BaseResp";
import { LoginResp } from "../types/user/LoginResp";

export default function LoginPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [loginReq, setLoginReq] = useState<LoginReq>({
        initial: "",
        password: "",
    });

    const isValid = (): boolean => {
        return loginReq.initial !== "" && loginReq.password !== "";
    };

    const login = (): void => {
        if (isValid()) {
            useCaseFactory
                .user()
                .login(loginReq)
                .subscribe({
                    next: (response: LoginResp | BaseResp) => {
                        if (response.errorSchema.errorCode === 200) {
                            useCaseFactory
                                .session()
                                .set(
                                    "user",
                                    JSON.stringify(response.outputSchema)
                                );
                            window.location.reload();
                        } else {
                            setLoginReq({
                                initial: "",
                                password: "",
                            });
                        }
                    },
                });
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            login();
        }
    };

    return (
        <Box pt={25}>
            <Grid container>
                <Grid size={5}></Grid>
                <Grid size={2}>
                    <Card
                        variant="outlined"
                        sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
                    >
                        <Fragment>
                            <CardContent>
                                <TextField
                                    value={loginReq.initial}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) =>
                                        setLoginReq({
                                            ...loginReq,
                                            initial: e.target.value,
                                        })
                                    }
                                    fullWidth
                                    variant="outlined"
                                    label="Initial"
                                    size="small"
                                    sx={{ mb: 3 }}
                                    onKeyDown={onKeyDown}
                                />
                                <TextField
                                    value={loginReq.password}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) =>
                                        setLoginReq({
                                            ...loginReq,
                                            password: e.target.value,
                                        })
                                    }
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    label="Password"
                                    size="small"
                                    sx={{ mb: 3 }}
                                    onKeyDown={onKeyDown}
                                />
                                <Button
                                    fullWidth
                                    color={isValid() ? "primary" : "secondary"}
                                    variant="contained"
                                    onClick={login}
                                >
                                    Login
                                </Button>
                            </CardContent>
                        </Fragment>
                    </Card>
                </Grid>
                <Grid size={5}></Grid>
            </Grid>
        </Box>
    );
}
