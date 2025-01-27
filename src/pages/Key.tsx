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
import KeyTable from "../components/KeyTable";
import { GetKeysResp } from "../types/key/GetKeysResp";
import { Key } from "../types/key/Key";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import { AddKeyReq } from "../types/key/AddKeyReq";
import { AddKeyResp } from "../types/key/AddKeyResp";
import AddKeyForm from "../components/form/AddKey";
import { User } from "../types/user/User";

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

export default function KeyPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const user: User = useCaseFactory.user().get();
    const [keyList, setKeyList] = useState<Key[]>([]);
    const [addKeyReq, setAddKeyReq] = useState<AddKeyReq>({
        rfid: "No",
        type: "Main",
        name: "",
        room: "",
        quantity: 0,
        location: "",
    });
    const [modalAdd, setModalAdd] = useState<boolean>(false);

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

    const addKey = (): void => {
        useCaseFactory
            .addKey()
            .execute(addKeyReq)
            .subscribe({
                next: (response: AddKeyResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setKeyList(keyList.concat(response.outputSchema));
                        setAddKeyReq({
                            rfid: "No",
                            type: "Main",
                            name: "",
                            room: "",
                            quantity: 0,
                            location: "",
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
                        Key
                    </Typography>
                </Grid>
                {user.role === "Security Operation Center" ? (
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
                ) : (
                    <></>
                )}
            </Grid>
            <KeyTable keyList={keyList} />
            <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
                <Paper sx={{ ...modalStyle }}>
                    <AddKeyForm
                        addKeyReq={addKeyReq}
                        setAddKeyReq={setAddKeyReq}
                        addKey={addKey}
                        onClose={() => setModalAdd(false)}
                    />
                </Paper>
            </Modal>
        </Box>
    );
}
