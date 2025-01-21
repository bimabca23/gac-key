import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PicTable from "../components/PicTable";
import { GetPicsResp } from "../types/pic/GetPicsResp";
import { Pic } from "../types/pic/Pic";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

export default function PicPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [picList, setPicList] = useState<Pic[]>([]);

    useEffect(() => {
        getPics();
    }, []);

    const getPics = (): void => {
        useCaseFactory
            .getPics()
            .execute()
            .subscribe({
                next: (response: GetPicsResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setPicList(response.outputSchema);
                    }
                },
            });
    };

    return (
        <Box p={5}>
            <Grid container>
                <Grid size={4}>
                    <Typography fontSize={35} mb={2}>
                        PIC
                    </Typography>
                </Grid>
                <Grid size={8}></Grid>
            </Grid>
            <PicTable picList={picList} />
        </Box>
    );
}
