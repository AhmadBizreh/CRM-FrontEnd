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
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { APIInstance } from '../../../Services/Api';
import EditIcon from "@mui/icons-material/Edit"
import CircularProgress from '@mui/material/CircularProgress';

let Product = [
  {
    productId: 0,
    name: "",
    price: 0,
    description: ""
  }
]

export default function IndexProduct() {
  const [Products, setProducts] = useState(Product);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Products List"
    GetProducts();
    setLoading(true)
  }, [])

  function GetProducts() {
    APIInstance.GetProducts().then((res) => {
      setProducts(res.data)
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
            to={"/Products/Add"}
          >
            Add New Product</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6} style={{ backgroundColor: '#707070' }}>
                <Typography variant='h4' style={{ textAlign: 'center' }}>
                  Products List
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Name</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Price</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Decription</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bolder' }}>Option</TableCell>
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
              {Products.map((prod) => (
                <TableRow
                  key={prod.productId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{prod.name}</TableCell>
                  <TableCell align="center">{prod.price}</TableCell>
                  <TableCell align="center">{prod.description}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      component={Link}
                      to={`/Products/Edit/${prod.productId}`}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
    </Layout>
  );
}