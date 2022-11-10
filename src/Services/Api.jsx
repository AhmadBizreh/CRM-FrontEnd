import axios from "axios";

const BaseURL = "http://www.crmtest.somee.com/api";

export default class Api {
  GetCustomers() {
    return axios.get(`${BaseURL}/Customers`, {});
  }
  AddCustomer(firstName, lastName, phone, email, code) {
    return axios.post(`${BaseURL}/Customers`, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      code: code,
    });
  }

  AddAddresses(
    addressline1,
    addressline2,
    city,
    state,
    postalCode,
    country,
    shippingaddress,
    billingaddress
  ) {
    return axios.post(`${BaseURL}/Addresses`, {
      addressline1: addressline1,
      addressline2: addressline2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      shippingaddress: shippingaddress,
      billingaddress: billingaddress,
    });
  }

  GetProducts() {
    return axios.get(`${BaseURL}/Products`, {});
  }
  AddProducts(name, description, price) {
    return axios.post(
      `${BaseURL}/Products`,
      {
        name: name,
        description: description,
        price: price,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  GetSaleOrders() {
    return axios.get(`${BaseURL}/Sales`, {});
  }
  AddSaleOrders() {
    return axios.post(`${BaseURL}/Sales`, {});
  }

  GetAddresses() {
    return axios.get(`${BaseURL}/Addresses`, {});
  }

  EditProducts(productId,name, description, price) {
    return axios.put(`${BaseURL}/Products/${productId}`, {
      name: name,
      description: description,
      price: price,     
    });
  }


  EditCustomer(id,firstName, lastName, phone, email, code) {
    return axios.put(`${BaseURL}/Customers/${id}`, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      code: code,
    });
  }

  EditAddresses(id,
    addressline1,
    addressline2,
    city,
    state,
    postalCode,
    country,
    shippingaddress,
    billingaddress
  ) {
    return axios.put(`${BaseURL}/Addresses/${id}`, {
      addressline1: addressline1,
      addressline2: addressline2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      shippingaddress: shippingaddress,
      billingaddress: billingaddress,
    });
  }

}
export let APIInstance = new Api();
