import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pic } from "../types/pic/Pic";

interface Props {
    picList: Pic[];
}

export default function PicTable(props: Props) {
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
                            Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Initial
                        </TableCell>
                    </TableRow>
                </TableHead>
                {props.picList.length ? (
                    <TableBody>
                        {props.picList.map((pic, index) => (
                            <TableRow
                                key={pic.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{pic.rfid}</TableCell>
                                <TableCell align="center">{pic.name}</TableCell>
                                <TableCell align="center">
                                    {pic.initial}
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
                            <TableCell align="center" colSpan={4}>
                                No Data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
}
