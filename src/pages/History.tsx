import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import download from "downloadjs";
import moment from "moment";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { ChangeEvent, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import HistoryTable from "../components/HistoryTable";
import { GetHistorysResp } from "../types/history/GetHistorysResp";
import { History } from "../types/history/History";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

export default function HistoryPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [historyList, setHistoryList] = useState<History[]>([]);
    const [filteredHistoryList, setFilteredHistoryList] = useState<History[]>(
        []
    );
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        getHistorys();
    }, []);

    useEffect(() => {
        if (date !== "") {
            filterData();
        } else {
            setFilteredHistoryList(historyList);
        }
    }, [date, historyList]);

    const getHistorys = (): void => {
        useCaseFactory
            .getHistorys()
            .execute()
            .subscribe({
                next: (response: GetHistorysResp) => {
                    if (response.errorSchema.errorCode === 200) {
                        setHistoryList(
                            response.outputSchema.filter(
                                (history) => history.status === "Inactive"
                            )
                        );
                        setFilteredHistoryList(
                            response.outputSchema.filter(
                                (history) => history.status === "Inactive"
                            )
                        );
                    }
                },
            });
    };

    const exportExcel = (): void => {
        const header: string[][] = [
            [
                "#",
                "Room",
                "Key",
                "Pass ID",
                "Purpose",
                "Borrow",
                "",
                "",
                "",
                "Return",
                "",
                "",
                "",
            ],
            [
                "",
                "",
                "",
                "",
                "",
                "Date",
                "Clock",
                "PIC",
                "SOC",
                "Date",
                "Clock",
                "PIC",
                "SOC",
            ],
        ];
        const data: string[][] = filteredHistoryList.map((history, index) => {
            return [
                (index + 1).toString(),
                history.key.room,
                history.key.name,
                history.passId,
                history.purpose,
                moment(history.borrowTime).utc().format("DD/MM/YY"),
                moment(history.borrowTime).utc().format("HH:mm"),
                history.borrowPic,
                history.borrowSoc,
                moment(history.returnTime).utc().format("DD/MM/YY"),
                moment(history.returnTime).utc().format("HH:mm"),
                history.returnPic,
                history.returnSoc,
            ];
        });

        const ws = XLSX.utils.aoa_to_sheet([...header, ...data]);
        ws["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
            { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
            { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
            { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
            { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
            { s: { r: 0, c: 5 }, e: { r: 0, c: 8 } },
            { s: { r: 0, c: 9 }, e: { r: 0, c: 12 } },
        ];
        ws["!cols"] = [
            { wch: 5 },
            { wch: 25 },
            { wch: 25 },
            { wch: 10 },
            { wch: 25 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
            { wch: 10 },
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, "export.xlsx");
    };

    const exportPdf = async () => {
        const url = "/static/form.pdf";
        const existingPdfBytes = await fetch(url).then((res) =>
            res.arrayBuffer()
        );
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        firstPage.drawText(
            moment(date).utc().add(1, "days").format("DD     MMM     YYYY"),
            {
                x: 388,
                y: height - 80,
                size: 11,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            }
        );
        filteredHistoryList.forEach((history, index) => {
            firstPage.drawText((index + 1).toString(), {
                x: 58,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.key.room, {
                x: 80,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.key.name, {
                x: 158,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.passId, {
                x: 300,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.purpose, {
                x: 342,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(
                moment(history.borrowTime).utc().format("HH:mm"),
                {
                    x: 432,
                    y: height - 146 - index * 13.95,
                    size: 10,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                }
            );
            firstPage.drawText(history.borrowPic, {
                x: 465,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.borrowSoc, {
                x: 527,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(
                moment(history.returnTime).utc().format("HH:mm"),
                {
                    x: 586,
                    y: height - 146 - index * 13.95,
                    size: 10,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                }
            );
            firstPage.drawText(history.returnPic, {
                x: 618,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(history.returnSoc, {
                x: 681,
                y: height - 146 - index * 13.95,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
            });
        });

        const pdfBytes = await pdfDoc.save();

        download(
            pdfBytes,
            moment(date).utc().add(1, "days").format("DD-MM-YYYY"),
            "application/pdf"
        );
    };

    const filterData = (): void => {
        setFilteredHistoryList(
            historyList.filter(
                (history) =>
                    moment(history.returnTime).utc().format("YYYY-MM-DD") ===
                    date
            )
        );
    };

    return (
        <Box p={5}>
            <Grid container>
                <Grid size={4}>
                    <Typography fontSize={35} mb={2}>
                        History
                    </Typography>
                </Grid>
                <Grid size={8}>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ float: "right" }}
                        onClick={exportExcel}
                    >
                        Excel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        sx={{ float: "right", mr: 2 }}
                        onClick={exportPdf}
                        disabled={date === ""}
                    >
                        PDF
                    </Button>
                    <TextField
                        value={date}
                        type="date"
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => setDate(e.target.value)}
                        size="small"
                        sx={{ float: "right", mr: 2 }}
                    />
                </Grid>
            </Grid>
            <HistoryTable historyList={filteredHistoryList} />
        </Box>
    );
}
