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
          <TableRow sx={{ "& > *": { fontWeight: "bold" } }}>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">RFID</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        {props.keyList.length ? (
          <TableBody>
            {props.keyList.map((key, index) => (
              <TableRow
                key={key.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{key.rfid}</TableCell>
                <TableCell align="center">{key.type}</TableCell>
                <TableCell align="center">{key.name}</TableCell>
                <TableCell align="center">{key.quantity} Pcs</TableCell>
                <TableCell align="center">{key.location}</TableCell>
                <TableCell align="center">{key.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" colSpan={7}>
                No Data
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
