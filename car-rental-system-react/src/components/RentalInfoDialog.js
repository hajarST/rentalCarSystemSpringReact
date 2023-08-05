// import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, List, ListItemText} from "@mui/material";
// import React, {useEffect, useState} from "react";
// import {useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import InfoIcon from "@mui/icons-material/Info";

// export default function RentalInfoDialog(props){
//     const userDetails = useSelector((state) => state.userDetails);

//     const [openDialog, setOpenDialog] = useState(false);
//     const [rentalHistory] = useState(props.statusHistory);
//     let navigate = useNavigate();

//     useEffect(() => {
//         if (!userDetails.roles.includes('ROLE_ADMIN')) {
//             navigate('/', {replace: true});
//         }
//     },[userDetails.token]);

//     const handleClickOpen = () => {
//         setOpenDialog(true);
//     };

//     const handleClose = () => {
//         setOpenDialog(false);
//     };

//     function getStatusName(name){
//         switch(name){
//             case "STATUS_PENDING": {
//                 return "En cours de traitement";
//             }
//             case "STATUS_ACCEPTED": {
//                 return "Accepté";
//             }
//             case "STATUS_REJECTED": {
//                 return "Refusé";
//             }
//             case "STATUS_CANCELLED": {
//                 return "Annulé";
//             }
//             default: {
//                 return "Non identifié";
//             }
//         }
//     }

//     return (
//         <>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                     handleClickOpen();
//                 }}
//             >
//                 <InfoIcon fontSize="small" />
//             </Button>

//             <Dialog open={openDialog} onClose={handleClose} maxWidth={"xs"} fullWidth>
//                 <DialogTitle>Historique des changements de statut</DialogTitle>

//                 <DialogContent>
//                     <List
//                         sx={{
//                             width: '100%',
//                             maxWidth: 360,
//                             bgcolor: 'background.paper',
//                         }}
//                     >
//                         {rentalHistory && rentalHistory.length > 0 ? (
//                             rentalHistory.map((item) => (
//                                 <>
//                                     <ListItem>
//                                         <ListItemText primary={getStatusName(item.statusAfterChange.name)} secondary={item.changeDate} />
//                                     </ListItem>
//                                     <Divider variant="inset" component="li" />
//                                 </>
//                             ))
//                         ) : (
//                             <ListItem>
//                                 <ListItemText align="center" primary={"Aucune donnée à afficher"} />
//                             </ListItem>
//                         )}
//                     </List>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Fermer</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }


import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, List, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

export default function RentalInfoDialog(props) {
  const userDetails = useSelector((state) => state.userDetails);

  const [openDialog, setOpenDialog] = useState(false);
  const [rentalHistory] = useState(props.statusHistory);
  let navigate = useNavigate();

  useEffect(() => {
    if (!userDetails.roles.includes('ROLE_ADMIN')) {
      navigate('/', { replace: true });
    }
  }, [userDetails.token]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  function getStatusName(name) {
    switch (name) {
      case "STATUS_PENDING": {
        return "En cours de traitement";
      }
      case "STATUS_ACCEPTED": {
        return "Accepté";
      }
      case "STATUS_REJECTED": {
        return "Refusé";
      }
      case "STATUS_CANCELLED": {
        return "Annulé";
      }
      default: {
        return "Non identifié";
      }
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <InfoIcon fontSize="small" />
      </Button>

      <Dialog open={openDialog} onClose={handleClose} maxWidth={"xs"} fullWidth>
        <DialogTitle>Historique des changements de statut</DialogTitle>

        <DialogContent>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {rentalHistory && rentalHistory.length > 0 ? (
              rentalHistory.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={getStatusName(item.statusAfterChange.name)} secondary={item.changeDate} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText align="center" primary={"Aucune donnée à afficher"} />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
