import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { History } from "../types/history/History";

interface Props {
  historyList: History[];
}

export default function HistoryTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              #
            </TableCell>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              Pass ID
            </TableCell>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              Key
            </TableCell>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              Purpose
            </TableCell>
            <TableCell
              align="center"
              colSpan={4}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              Borrow
            </TableCell>
            <TableCell
              align="center"
              colSpan={4}
              sx={{ fontWeight: "bold", p: 1 }}
            >
              Return
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              Clock
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              PIC
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              SOC
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              Date
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              Clock
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              PIC
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
              SOC
            </TableCell>
          </TableRow>
        </TableHead>
        {props.historyList.length ? (
          <TableBody>
            {props.historyList.map((history, index) => (
              <TableRow
                key={history.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{history.passId}</TableCell>
                <TableCell align="center">{history.key.name}</TableCell>
                <TableCell align="center">{history.purpose}</TableCell>
                <TableCell align="center">
                  {moment(history.borrowTime).utcOffset(7).format("DD/MM/YY")}
                </TableCell>
                <TableCell align="center">
                  {moment(history.borrowTime).utcOffset(7).format("HH:mm")}
                </TableCell>
                <TableCell align="center">{history.borrowPic}</TableCell>
                <TableCell align="center">{history.borrowSoc}</TableCell>
                <TableCell align="center">
                  {history.returnTime === "" ? "" : moment(history.returnTime).utcOffset(7).format("DD/MM/YY")}
                </TableCell>
                <TableCell align="center">
                  {history.returnTime === "" ? "" : moment(history.returnTime).utcOffset(7).format("HH:mm")}
                </TableCell>
                <TableCell align="center">{history.returnPic}</TableCell>
                <TableCell align="center">{history.returnSoc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" colSpan={12}>
                No Data
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
