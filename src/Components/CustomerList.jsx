import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"
import { Button, Snackbar } from "@mui/base";
import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react'
import { useRef } from "react";

export default function CustomerList() {

    const [customers, setCustomers] = useState([{
        id: '',
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    }]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';


    const columns = [
        { headerName: 'id', field: 'id', sortable: true, filter: true },
        { headerName: 'first name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'street address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'city', field: 'city', sortable: true, filter: true },
        { headerName: 'email', field: 'email', sortable: true, filter: true },
        { headerName: 'phone', field: 'phone', sortable: true, filter: true },
        { cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />, width: 120 },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(URL)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.customers);
                setCustomers(responseData._embedded.customers);
            })
            .catch(err => console.error(err));
    }

    const gridRef = useRef();

    const deleteCustomer = (params) => {
        console.log("params.data: ", params.data)
        console.log("params.data._links.customer.href = " + params.data._links.customer.href);
        console.log("id = " + gridRef.current.getSelectedNodes()[0].id);
        if (window.confirm('Are you sure you want to delete ' + params.data.id + "?")) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMessage('Customer deleted');
                        setOpen(true);
                        getCustomers();
                    } else
                        alert('Something went wrong ' + response.status);
                })
                .catch(err => console.error(err));
        }
    }

    const addCustomer = (customer) => {
        console.log("Customerlist: add customer to db by using rest service, method is POST")
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                console.log(response)

                if (response.ok) {
                    setMessage('Customer inserted successfully');
                    setOpen(true);
                    return response.json();
                } else {
                    throw new Error('Something went wrong when adding a new customer');
                }
            })
            .then(data => {
                console.log('addCustomer: parsed JSON data = ', data);
                getCustomers();
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (URL, updatedCustomer) => {
        console.log("updatedCar " + updatedCustomer);
        fetch(URL, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Customer updated successfully');
                    setOpen(true);
                    getCustomers();
                } else {
                    console.log("updatedCustomer " + JSON.stringify(updatedCustomer));
                    alert('Something went wrong when updating a customer' + response.statusText);
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
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