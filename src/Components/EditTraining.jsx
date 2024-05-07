import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditCustomer from './EditCustomer';

export default function EditTraining(props) {

    const[training, setTraining] = React.useState({
        id: '',
        date: new Date(),
        duration: Number(),
        activity: '',
        customer: {}
    });


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.params);
        setTraining({
            date: props.params.data.date,
            duration: props.params.data.duration,
            activity: props.params.data.activity,
            customer: props.params.data.customer.firstname
        });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick')
        setOpen(false);
    };

    const handleSave = () => {
        console.log(props.params.data._links.training.href);
    props.updateTraining(props.params.data._links.training.href, training);
    setOpen(false);
    }

    return (
        <div>
        <Button size="small" onClick={handleClickOpen}>
          Edit Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Training</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="date"
              value={training.date}
              onChange={(e) => setTraining({ ...training, date: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="duration"
              value={training.duration}
              onChange={(e) => setTraining({ ...training, duration: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="activity"
              value={training.activity}
              onChange={(e) => setTraining({ ...training, activity: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="customer"
              value={training.customer.id}
              onChange={(e) => setTraining({ ...training, customer: e.target.value })}
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