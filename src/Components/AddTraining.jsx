import React from "react";
import { Button, Snackbar } from "@mui/base";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {

    const [training, setTraining] = React.useState({
        id: '',
        date: new Date(),
        duration: Number(),
        activity: '',
        customer: props.customer.id
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
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add training
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="id"
                        value={training.id}
                        onChange={(e) => setTraining({ ...training, id: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
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