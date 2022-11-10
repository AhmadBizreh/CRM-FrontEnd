import Layout from "../../Layout/Layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { CountriesEn } from "../../../Services/CountriesEn";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { APIInstance } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function EditCustomer() {
  const navigate = useNavigate();
  const [Countries, setCountry] = useState("Syria");
  const [Billing, setBilling] = useState();
  const [Shipping, setShipping] = useState();
  const { id } = useParams();
  useEffect(() => {
    document.title = "Edit Customer";
    CustomerDetials();
    AddressesDetials();
  }, []);

  const [Customervalues, setCustomerValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    code: "",
  });
  const [Addressvalues, setAddressvalues] = useState({
    Addtressline1: "",
    Addtressline2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    shippingaddress: "",
    billingaddress: "",
  });

  let data = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    code: "",
    Addtressline1: "",
    Addtressline2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    shippingaddress: "",
    billingaddress: "",
  };
  const [formData, setFormData] = useState(data);

  const handleChange = (event) => {
    setCountry(event.target.value);
    setAddressvalues({
      ...Addressvalues,
      country: event.target.value,
    });
  };
  const handleBillingChange = (event) => {
    setBilling(event.target.value);
    setAddressvalues({
      ...Addressvalues,
      billingaddress: event.target.value,
    });
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    setAddressvalues({
      ...Addressvalues,
      shippingaddress: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    APIInstance.EditAddresses(id,
      Addressvalues.addressline1,
      Addressvalues.addressline2,
      Addressvalues.city,
      Addressvalues.state,
      Addressvalues.postalCode,
      Addressvalues.country,
      Addressvalues.shippingaddress,
      Addressvalues.billingaddress
    );
    APIInstance.EditCustomer(id,
      Customervalues.firstName,
      Customervalues.lastName,
      Customervalues.phone,
      Customervalues.email,
      Customervalues.code
    ).then(() => {
      navigate(`/Customers/Index`);
    });
  };

  function CustomerDetials() {
    return axios
      .get(`http://www.crmtest.somee.com/api/Customers/${id}`)
      .then((res) => {
        console.log(res.data.firstName);
        data = {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          code: res.data.code,
        };
        setFormData(data);
      });
  }
  function AddressesDetials() {
    return axios
      .get(`http://www.crmtest.somee.com/api/addresses/${id}`)
      .then((res) => {
        console.log(res.data.country);
        data = {
          Addtressline1: res.data.Addtressline1,
          Addtressline2: res.data.Addtressline2,
          city: res.data.city,
          state: res.data.state,
          postalCode: res.data.postalCode,
          country: res.data.country,
          shippingaddress: res.data.shippingaddress,
          billingaddress: res.data.billingaddress,
        };
        setFormData(data);
      });
  }
  return (
    <Layout>
      <Card>
        <Container component="main">
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", marginBottom: "15px" }}
                >
                  Edit Customer
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={
                    Customervalues.firstName !== ""
                      ? Customervalues.firstName
                      : formData.firstName
                  }
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      firstName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={
                    Customervalues.lastName !== ""
                      ? Customervalues.lastName
                      : formData.lastName
                  }
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      lastName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Editress"
                  name="email"
                  value={
                    Customervalues.email !== ""
                      ? Customervalues.email
                      : formData.email
                  }
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="number"
                  label="Phone Number"
                  type="number"
                  id="number"
                  value={
                    Customervalues.phone !== ""
                      ? Customervalues.phone
                      : formData.phone
                  }
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="code"
                  label="Customer Code"
                  type="text"
                  value={
                    Customervalues.code !== ""
                      ? Customervalues.code
                      : formData.code
                  }
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      code: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
                  required
                  label="Country"
                  value={
                    Addressvalues.country !== ""
                      ? Addressvalues.country
                      : formData.country
                  }
                  onChange={handleChange}
                >
                  {CountriesEn.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Customer City"
                  type="text"
                  value={
                    Addressvalues.city !== ""
                      ? Addressvalues.city
                      : formData.city
                  }
                  onChange={(e) =>
                    setAddressvalues({
                      ...Addressvalues,
                      city: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="State"
                  label="City State"
                  type="text"
                  value={
                    Addressvalues.state !== ""
                      ? Addressvalues.state
                      : formData.state
                  }
                  onChange={(e) =>
                    setAddressvalues({
                      ...Addressvalues,
                      state: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="Postal Code"
                  label="Postal Code"
                  type="text"
                  value={
                    Addressvalues.postalCode !== ""
                      ? Addressvalues.postalCode
                      : formData.postalCode
                  }
                  onChange={(e) =>
                    setAddressvalues({
                      ...Addressvalues,
                      postalCode: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextareaAutosize
                  fullWidth
                  aria-label="minimum height"
                  minRows={5}
                  style={{
                    width: " 100%",
                    maxWidth: " 100%",
                    border: "solid 1px rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    padding: "16.5px 14px",
                  }}
                  placeholder="address Line 1"
                  required
                  value={
                    Addressvalues.addressline1 !== ""
                      ? Addressvalues.addressline1
                      : formData.addressline1
                  }
                  onChange={(e) =>
                    setAddressvalues({
                      ...Addressvalues,
                      addressline1: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextareaAutosize
                  fullWidth
                  aria-label="minimum height"
                  minRows={5}
                  style={{
                    width: " 100%",
                    maxWidth: " 100%",
                    border: "solid 1px rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    padding: "16.5px 14px",
                  }}
                  placeholder="address Line 2"
                  required
                  value={
                    Addressvalues.addressline2 !== ""
                      ? Addressvalues.addressline2
                      : formData.addressline2
                  }
                  onChange={(e) =>
                    setAddressvalues({
                      ...Addressvalues,
                      addressline2: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  value={
                    Addressvalues.shippingaddress !== ""
                      ? Addressvalues.shippingaddress
                      : formData.shippingaddress
                  }
                  required
                  label="Shipping address"
                  onChange={handleShippingChange}
                >
                  <MenuItem value="addressLine1">address Line 1</MenuItem>
                  <MenuItem value="addressLine2">address Line 2</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  value={
                    Addressvalues.billingaddress !== ""
                      ? Addressvalues.billingaddress
                      : formData.billingaddress
                  }
                  label="Billing address"
                  required
                  onChange={handleBillingChange}
                >
                  <MenuItem value="addressLine1">address Line 1</MenuItem>
                  <MenuItem value="addressLine2">address Line 2</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="info"
              style={{
                display: "flex",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Save Customer
            </Button>
          </Box>
        </Container>
      </Card>
    </Layout>
  );
}
