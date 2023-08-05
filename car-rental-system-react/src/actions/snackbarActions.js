export const showSnackbar = (message, isSuccessSnackbar) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_SHOW", message, isSuccessSnackbar });
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" });
    };
};