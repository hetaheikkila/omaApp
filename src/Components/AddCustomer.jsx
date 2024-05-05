import React from "react";
import { Button, Snackbar } from "@mui/base";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {

    const [customer, setCustomer] = React.useState({
        id: '',
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        console.log("handleClose -> setOpenFalse or not? " + reason);
        if (reason !== 'backdropClick')
          setOpen(false);
      };

    const handleSave = () => {
        console.log("AddCustomer; adds a new customer");
        props.AddCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add customer
                </DialogTitle>
                <DialogContent>
                <TextField
              margin="dense"
              label="id"
              value={customer.id}
              onChange={(e) => setCustomer({ ...customer, id: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="firstname"
              value={customer.firstname}
              onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="lastname"
              value={customer.lastname}
              onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="streetaddress"
              value={customer.streetaddress}
              onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="postcode"
              value={customer.postcode}
              onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="city"
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>  
    );
}