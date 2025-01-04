import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { Pic } from "../types/pic/Pic";
import RfidButton from "./RfidButton";

export interface Props {
    picList: Pic[];
    selectedPic(pic: Pic): void;
    setActionType(actionType: "Borrow" | "Return" | undefined): void;
}

export default function ActionBox(props: Props) {
    const [rfidBorrow, setRfidBorrow] = useState<string>("");
    const [rfidReturn, setRfidReturn] = useState<string>("");

    return (
        <Box minWidth={275} width="100%">
            <Card
                variant="outlined"
                sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
            >
                <Fragment>
                    <CardContent>
                        <Typography fontSize={30}>Key Flow</Typography>
                    </CardContent>
                    <CardActions>
                        <RfidButton
                            rfid={rfidBorrow}
                            setRfid={setRfidBorrow}
                            onEnter={() => {
                                const pic: Pic | undefined = props.picList.find(
                                    (pic) => pic.rfid === rfidBorrow
                                );
                                if (pic) {
                                    props.selectedPic(pic);
                                    props.setActionType("Borrow");
                                }
                            }}
                            inactiveColor="primary"
                            activeText="PEMINJAMAN"
                            inactiveText="PEMINJAMAN"
                            fullWidth
                            fontSize={25}
                        />
                    </CardActions>
                    <CardActions>
                        <RfidButton
                            rfid={rfidReturn}
                            setRfid={setRfidReturn}
                            onEnter={() => {
                                const pic: Pic | undefined = props.picList.find(
                                    (pic) => pic.rfid === rfidReturn
                                );
                                if (pic) {
                                    props.selectedPic(pic);
                                    props.setActionType("Return");
                                }
                            }}
                            inactiveColor="primary"
                            activeText="PENGEMBALIAN"
                            inactiveText="PENGEMBALIAN"
                            fullWidth
                            fontSize={25}
                        />
                    </CardActions>
                </Fragment>
            </Card>
        </Box>
    );
}
