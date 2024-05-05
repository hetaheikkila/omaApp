import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from '@mui/material';
import { useRef } from "react";
import EditTraining from './EditTraining';

export default function TrainingList() {

    const [trainings, setTrainings] = useState([{id: '',
    date: new Date(),
    duration: Number(),
    activity: '',
    customer: ''}]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings';

    const columns = [
        { headerName: 'id', field: 'id', sortable: true, filter: true },
        { headerName: 'date', field: 'date', sortable: true, filter: true },
        { headerName: 'duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'customer', field: 'customer', sortable: true, filter: true },
        { cellRenderer: params => <EditTraining updateTraining={updateTraining} params={params} />, width: 120 },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(URL)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.trainings);
                setTrainings(responseData._embedded.trainings);
            })
            .catch(err => console.error(err));
    }

    const gridRef = useRef();

    const deleteTraining = (params) => {
        console.log("params.data: ", params.data)
        console.log("params.data._links.customer.href = " + params.data._links.training.href);
        console.log("id = " + gridRef.current.getSelectedNodes()[0].id);
        if (window.confirm('Are you sure you want to delete ' + params.data.id + "?")) {
            fetch(params.data._links.training.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMessage('Training deleted');
                        setOpen(true);
                        getTrainings();
                    } else
                        alert('Something went wrong ' + response.status);
                })
                .catch(err => console.error(err));
        }
    }

    const AddTraining = (training) => {
        console.log("Customerlist: add customer to db by using rest service, method is POST")
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                console.log(response)

                if (response.ok) {
                    setMessage('Training inserted successfully');
                    setOpen(true);
                    return response.json();
                } else {
                    throw new Error('Something went wrong when adding a new customer');
                }
            })
            .then(data => {
                console.log('addCustomer: parsed JSON data = ', data);
                getTrainings();
            })
            .catch(err => console.error(err))
    }

    const updateTraining = (URL, updatedTraining) => {
        console.log("updatedTraining " + updatedTraining);
        fetch(URL, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTraining)
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Training updated successfully');
                    setOpen(true);
                    getTrainings();
                } else {
                    console.log("updatedTraining " + JSON.stringify(updatedTraining));
                    alert('Something went wrong when updating the trainigs' + response.statusText);
                }
            })
            .catch(err => console.error(err))
    }


    return(
        <>
        <AddTraining addTraining={AddTraining} />
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    animateRows={true}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={message}
                />
            </div>
        </>
    );
}