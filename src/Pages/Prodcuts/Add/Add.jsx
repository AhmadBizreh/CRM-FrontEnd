import Layout from "../../Layout/Layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { APIInstance } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add Product";
  }, []);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 22.2,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    APIInstance.AddProducts(values.name, values.description, values.price).then(
      () => {

        navigate(`/Products/Index`);
      }
    );
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
                  Add Product
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  label="Product Name"
                  autoFocus
                  onChange={(e) =>
                    setValues({
                      ...values,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  required
                  fullWidth
                  label="Product price"
                  type="text"
                  autoFocus
                  onChange={(e) =>
                    setValues({
                      price: e.target.value.toFiext(2),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="Description"
                  multiline
                  onChange={(e) =>
                    setValues({
                      ...values,
                      description: e.target.value,
                    })
                  }
                />
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
              Save Product
            </Button>
          </Box>
        </Container>
      </Card>
    </Layout>
  );
}
