import {Grid, List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";

export default function GridItem(props){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        height: 70,
        lineHeight: '60px',
    }));

    return (
        <Grid item xs={props.xs} md={props.md}>
            <Item>
                <List dense={true}>
                    <ListItem>
                        <ListItemIcon>
                            {props.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={props.primaryText}
                            secondary={props.secondaryText}
                        />
                    </ListItem>
                </List>
            </Item>
        </Grid>
    );
}