import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import { useEffect, useState } from "react";
import HistoryTable from "../components/HistoryTable";
import { GetHistorysResp } from "../types/history/GetHistorysResp";
import { History } from "../types/history/History";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

export default function HistoryPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [historyList, setHistoryList] = useState<History[]>([]);

    useEffect(() => {
        getHistorys();
    }, []);

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
                    }
                },
            });
    };

    const exportCsv = (): void => {
        let rows: string[][] = [
            [
                "#",
                "Pass ID",
                "Key",
                "Purpose",
                "Borrow Date",
                "Borrow Clock",
                "Borrow PIC",
                "Borrow SOC",
                "Return Date",
                "Return Clock",
                "Return PIC",
                "Return SOC",
            ],
        ];

        historyList.forEach((history, index) => {
            rows.push([
                (index + 1).toString(),
                history.passId,
                history.key.name,
                history.purpose,
                moment(history.borrowTime).utcOffset(7).format("DD/MM/YY"),
                moment(history.borrowTime).utcOffset(7).format("HH:mm"),
                history.borrowPic,
                history.borrowSoc,
                moment(history.returnTime).utcOffset(7).format("DD/MM/YY"),
                moment(history.returnTime).utcOffset(7).format("HH:mm"),
                history.returnPic,
                history.returnSoc,
            ]);
        });

        let csvContent = "";
        rows.forEach((row) => {
            csvContent += row.join(",") + "\n";
        });

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8,",
        });
        const objUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", objUrl);
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Box p={5}>
            <Box>
                <Button
                    color="success"
                    variant="contained"
                    sx={{ float: "right", mb: 3 }}
                    onClick={exportCsv}
                >
                    Export
                </Button>
            </Box>
            <HistoryTable historyList={historyList} />
        </Box>
    );
}
