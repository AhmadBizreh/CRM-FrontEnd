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
import { useNavigate } from "react-router-dom";
export default function AddCustomer() {
  const navigate = useNavigate();
  const [Countries, setCountry] = useState("Syria");
  const [Billing, setBilling] = useState();
  const [Shipping, setShipping] = useState();
  useEffect(() => {
    document.title = "Add Customer";
  }, []);

  const [Customervalues, setCustomerValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    code: "",
  });
  const [Addressvalues, setAddressValues] = useState({
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    shippingaddress: "",
    billingaddress: "",
  });

  const handleChange = (event) => {
    setCountry(event.target.value);
    setAddressValues({
      ...Addressvalues,
      country: event.target.value,
    });
  };
  const handleBillingChange = (event) => {
    setBilling(event.target.value);
    setAddressValues({
      ...Addressvalues,
      billingaddress: event.target.value,
    });
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    setAddressValues({
      ...Addressvalues,
      shippingaddress: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    APIInstance.AddAddresses(
      Addressvalues.addressline1,
      Addressvalues.addressline2,
      Addressvalues.city,
      Addressvalues.state,
      Addressvalues.postalCode,
      Addressvalues.country,
      Addressvalues.shippingaddress,
      Addressvalues.billingaddress
    );
    APIInstance.AddCustomer(
      Customervalues.firstName,
      Customervalues.lastName,
      Customervalues.phone,
      Customervalues.email,
      Customervalues.code
    ).then(() => {
      navigate(`/Customers/Index`);
    });
  };
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
                  Add Customer
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
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
                  autoComplete="family-name"
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  value={Countries}
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
                  name="City"
                  label="Customer City"
                  type="text"
                  onChange={(e) =>
                    setAddressValues({
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
                  onChange={(e) =>
                    setAddressValues({
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
                  onChange={(e) =>
                    setAddressValues({
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
                  placeholder="Address Line 1"
                  required
                  onChange={(e) =>
                    setAddressValues({
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
                  placeholder="Address Line 2"
                  required
                  onChange={(e) =>
                    setAddressValues({
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
                  value={Shipping}
                  required
                  label="Shipping Address"
                  onChange={handleShippingChange}
                >
                  <MenuItem value="AddressLine1">Address Line 1</MenuItem>
                  <MenuItem value="AddressLine2">Address Line 2</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  value={Billing}
                  label="Billing Address"
                  required
                  onChange={handleBillingChange}
                >
                  <MenuItem value="AddressLine1">Address Line 1</MenuItem>
                  <MenuItem value="AddressLine2">Address Line 2</MenuItem>
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
