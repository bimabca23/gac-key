import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyTable from "../components/KeyTable";
import { GetKeysResp } from "../types/key/GetKeysResp";
import { Key } from "../types/key/Key";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

export default function KeyPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [keyList, setKeyList] = useState<Key[]>([]);

    useEffect(() => {
        getKeys();
    }, []);

    const getKeys = (): void => {
        useCaseFactory
            .getKeys()
            .execute()
            .subscribe({
                next: (response: GetKeysResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setKeyList(response.outputSchema);
                    }
                },
            });
    };

    return (
        <Box p={5}>
            <Grid container>
                <Grid size={4}>
                    <Typography fontSize={35} mb={2}>
                        Key
                    </Typography>
                </Grid>
                <Grid size={8}></Grid>
            </Grid>
            <KeyTable keyList={keyList} />
        </Box>
    );
}
