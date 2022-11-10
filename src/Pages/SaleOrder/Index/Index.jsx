import React, { useEffect, useState } from 'react';
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


import CircularProgress from '@mui/material/CircularProgress';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';

let SaleOrder = [
  {
    salesId: 0,
    status: '',
    date: '',
    subtotal: '',
    grandtotal: '',
    customerId: '',
  }
]

export default function IndexSaleOrder() {
  const [Loading, setLoading] = useState(true);
  const [SaleOrders, setSaleOrders] = useState(SaleOrder);
  useEffect(() => {
    document.title = "Sale Orders List";
    GetSaleOrders();
    setLoading(true)
  }, [GetSaleOrders()])

  function GetSaleOrders() {
    APIInstance.GetSaleOrders().then((res) => {
      setSaleOrders(res.data)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    })
  }

  const DeletProHanler = (salesId) => {
    
    if (window.confirm('Are you sure')) {      
      fetch('http://CRMtest.somee.com/api/Sales/' + salesId,
        {
          method: 'DELETE',
          header: { 'Accept': 'application/json' },
          'Content-Type': 'application/json'
        })
        GetSaleOrders();             
    }
  }

  return (
    <Layout>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7} style={{ backgroundColor: '#707070' }}>
                <Typography variant='h4' style={{ textAlign: 'center' }}>
                  Sale Orders List
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Customer ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">Grandtotal</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          {Loading ?
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
              {SaleOrders.map((Sale) => (
                <TableRow
                  key={Sale.salesId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{Sale.customerId}</TableCell>
                  <TableCell align="center">{Sale.status}</TableCell>
                  <TableCell align="center">
                    {moment(Sale.date).format("YYYY/MM/DD")}</TableCell>
                  <TableCell align="center">{Sale.subtotal}</TableCell>
                  <TableCell align="center">{Sale.grandtotal}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => { DeletProHanler(Sale.salesId) }}
                    // component={Link}
                    // to={`/SaleOrders/Edit/${Sale.salesId}`}
                    >
                      <DeleteIcon></DeleteIcon>
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