import Layout from "../../Layout/Layout"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { APIInstance } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();
    useEffect(() => {
        document.title = "Edit Product"
        ProductsDetials();
    }, [])

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",

    });
    let data = {
        name: "",
        description: "",
        price: "",
    };

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [formData, setFormData] = useState(data);

  

    const handleNameChange = (event) => {
        setName(event.target.value);
        setValues({ ...values, name: event.target.value });
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setValues({ ...values, description: event.target.value });
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setValues({ ...values, price: event.target.value });
    };

    APIInstance.EditProducts(productId,
        values.name,
        values.description,
        values.price,

    ).then(() => {
        navigate(`/Products/Index`);
    });


    function ProductsDetials() {
        return axios
            .get(`http://www.crmtest.somee.com/api/Products/${productId}`)
            .then((res) => {
                console.log(res.data.name);
                data = {
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                };
                setFormData(data);
            });
    }

    return (<Layout>
        <Card>
            <Container component="main" >
                <Box
                    component="form"
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '15px' }}>Edit Product</Typography>
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
                                value= {formData.name}
                            //        values.name !== ""
                            //            ? values.name
                            //            : formData.name
                            //    }
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Product Price"
                                name="Product Price"
                                value={
                                    values.price !== ""
                                        ? values.price
                                        : formData.price
                                }
                                onChange={handlePriceChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="Description"
                                multiline
                                value={
                                    values.description !== ""
                                        ? values.description
                                        : formData.description
                                }
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="info"
                        style={{ display: "flex", marginRight: "auto", marginLeft: "auto" }}
                    >
                        Save Edits
                    </Button>
                </Box>
            </Container>
        </Card></Layout>);
}