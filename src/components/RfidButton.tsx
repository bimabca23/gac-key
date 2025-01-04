import { Button, TextField } from "@mui/material";
import { ChangeEvent, Fragment, KeyboardEvent, useRef, useState } from "react";

interface Props {
    rfid: string;
    setRfid(rfid: string): void;
    onEnter(): void;
    onBlur?(): void;
    activeColor?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning";
    inactiveColor?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning";
    activeText?: string;
    inactiveText?: string;
    fullWidth?: boolean;
    fontSize?: number;
}

export default function RfidButton(props: Props) {
    const [active, setActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        props.setRfid(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            props.setRfid("");
            props.onEnter();
        }
    };

    const onFocus = (): void => {
        setActive(true);
    };

    const onBlur = (): void => {
        setActive(false);
        if (props.onBlur) {
            props.onBlur();
        }
    };

    return (
        <Fragment>
            <TextField
                inputRef={inputRef}
                value={props.rfid}
                size="small"
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                sx={{
                    position: "absolute",
                    left: -10000,
                }}
            />
            <Button
                variant="contained"
                size="large"
                color={
                    active
                        ? props.activeColor ?? "success"
                        : props.inactiveColor ?? "error"
                }
                sx={{
                    width: props.fullWidth ? "100%" : "fit-content",
                    fontSize: props.fontSize ?? 15,
                    animation: active ? "ping 1s infinite" : "none",
                    "@keyframes ping": {
                        "0%": { opacity: 1 },
                        "50%": { opacity: 0.75 },
                        "100%": { opacity: 1 },
                    },
                }}
                onClick={() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
            >
                {active
                    ? props.activeText ?? "RFID (ON)"
                    : props.inactiveText ?? "RFID (OFF)"}
            </Button>
        </Fragment>
    );
}
