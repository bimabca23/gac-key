import {
    Box,
    Button,
    Grid2 as Grid,
    Modal,
    Paper,
    SxProps,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PicTable from "../components/PicTable";
import { GetPicsResp } from "../types/pic/GetPicsResp";
import { Pic } from "../types/pic/Pic";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import AddPicForm from "../components/form/AddPic";
import { AddPicReq } from "../types/pic/AddPicReq";
import { AddPicResp } from "../types/pic/AddPicResp";

const modalStyle: SxProps = {
    position: "absolute",
    borderRadius: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25vw",
    boxShadow: 24,
    p: 2,
};

export default function PicPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [picList, setPicList] = useState<Pic[]>([]);
    const [addPicReq, setAddPicReq] = useState<AddPicReq>({
        rfid: "",
        name: "",
        initial: "",
    });
    const [modalAdd, setModalAdd] = useState<boolean>(false);

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

    const addPic = (): void => {
        useCaseFactory
            .addPic()
            .execute(addPicReq)
            .subscribe({
                next: (response: AddPicResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setPicList(picList.concat(response.outputSchema));
                        setAddPicReq({
                            rfid: "",
                            name: "",
                            initial: "",
                        });
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
                <Grid size={8}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ float: "right" }}
                        onClick={() => setModalAdd(true)}
                    >
                        ADD
                    </Button>
                </Grid>
            </Grid>
            <PicTable picList={picList} />
            <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
                <Paper sx={{ ...modalStyle }}>
                    <AddPicForm
                        addPicReq={addPicReq}
                        setAddPicReq={setAddPicReq}
                        addPic={addPic}
                        onClose={() => setModalAdd(false)}
                    />
                </Paper>
            </Modal>
        </Box>
    );
}
