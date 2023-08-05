import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {clearSnackbar} from "../actions/snackbarActions";
import React from "react";

export default function GlobalSnackbar() {
    const dispatch = useDispatch();

    const { snackbarMessage, snackbarOpen, isSuccessSnackbar } = useSelector((state) => state.snackbar);

    function getSeverity(isSuccess){
        if(isSuccess === true){
            return "success";
        }

        return "error";
    }

    function handleClose() {
        dispatch(clearSnackbar());
    }

    return (
        <Snackbar open={snackbarOpen} autohideduration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={getSeverity(isSuccessSnackbar)} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}