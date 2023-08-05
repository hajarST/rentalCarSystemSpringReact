const snackbarReducer = (state = {}, action) => {
    switch (action.type) {
        case "SNACKBAR_SHOW":
            return {
                ...state,
                snackbarOpen: true,
                snackbarMessage: action.message,
                isSuccessSnackbar: action.isSuccessSnackbar
            };
        case "SNACKBAR_CLEAR":
            return {
                ...state,
                snackbarOpen: false
            };
        default:
            return state;
    }
};

export default snackbarReducer;