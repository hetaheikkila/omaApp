import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {

    const [customer, setCustomer] = React.useState({
        id: '',
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.params);
        setCustomer({
            id: props.params.data.id,
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone:  props.params.data.phone
        });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick')
        setOpen(false);
    };

    const handleSave = () => {
        console.log(props.params.data._links.customer.href);
    props.updateCar(props.params.data._links.customer.href, customer);
    setOpen(false);
    }

    return (
        <div>
        <Button size="small" onClick={handleClickOpen}>
          Edit Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
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