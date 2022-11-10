import React, { useEffect, useState, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../../Layout/Layout"
import { Typography } from '@mui/material';
import { APIInstance } from '../../../Services/Api';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import ContactsIcon from '@mui/icons-material/Contacts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

let Customer = [
  {
    customerId: 0,
    code: '',
    firstName: '',
    lastName: '',
    active: null,
    email: '',
    phone: '',
  }
]

export default function IndexCustomer() {
  const [Customers, setCustomers] = useState(Customer);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    document.title = "Customers List"
    setLoading(true);
    GetCustomers();
  }, [])

  function GetCustomers() {

    APIInstance.GetCustomers().then((res) => {
      setCustomers(res.data);
      setLoading(false)
    }).catch((error) => {

      setLoading(false)
    })
  }

  
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            style={{ marginBottom: '15px', float: "right" }}
            variant='contained'
            color="warning"
            component={Link}
            to={"/Customers/Add"}
          >
            Add New Customer</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7} style={{ backgroundColor: '#707070' }}>
                <Typography variant='h4' style={{ textAlign: 'center' }}>
                  Customers List
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Code</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>First Name</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Last Name</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Status</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Email</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Phone</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          {loading ?
            <TableBody>

              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <div style={{
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <CircularProgress style={{ width: '50px', height: '50px' }} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
            :
            <TableBody>
              {Customers.map((Cust) => (
                <TableRow
                  key={Cust.customerId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{Cust.code}</TableCell>
                  <TableCell align="center">{Cust.firstName}</TableCell>
                  <TableCell align="center">{Cust.lastName}</TableCell>
                  <TableCell align="center">
                    {Cust.active == true ? <CheckCircleIcon color='success' /> : <CancelIcon color="error" />}
                  </TableCell>
                  <TableCell align="center">{Cust.email}</TableCell>
                  <TableCell align="center">{Cust.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      style={{ marginRight: '5px' }}
                      component={Link}
                      to={`/Customers/Details/${Cust.customerId}`}
                    >
                      <ContactsIcon></ContactsIcon>
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      component={Link}
                      to={`/Customers/Edit/${Cust.customerId}`}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          }
        </Table>
      </TableContainer>

    </Layout>
  );
}