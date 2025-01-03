import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Key } from "../types/key/Key";

interface Props {
    keyList: Key[];
}

export default function KeyTable(props: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            #
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            RFID
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Type
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Quantity
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Location
                        </TableCell>
                    </TableRow>
                </TableHead>
                {props.keyList.length ? (
                    <TableBody>
                        {props.keyList.map((key, index) => (
                            <TableRow
                                key={key.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{key.rfid}</TableCell>
                                <TableCell align="center">{key.type}</TableCell>
                                <TableCell align="center">{key.name}</TableCell>
                                <TableCell align="center">
                                    {key.quantity} Pcs
                                </TableCell>
                                <TableCell align="center">
                                    {key.location}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="center" colSpan={6}>
                                No Data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
}
