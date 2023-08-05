import {Box, Typography} from "@mui/material";
import React from "react";

const NoPage = () => {
    return (
        <Box marginTop={20}>
            <Typography variant='h4' align='center'>La page à l'adresse indiquée n'existe pas !</Typography>
        </Box>
    );
};
  
export default NoPage;