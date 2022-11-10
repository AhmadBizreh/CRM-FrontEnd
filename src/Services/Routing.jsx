import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCustomer from "../Pages/Customers/Add/Add";
import EditCustomer from "../Pages/Customers/Edit/Edit";
import IndexCustomer from "../Pages/Customers/Index/Index";
import DetailsCustomer from "../Pages/Customers/Details/Details";
import IndexProduct from "../Pages/Prodcuts/Index/Index";
import AddProduct from "../Pages/Prodcuts/Add/Add";
import EditProduct from "./../Pages/Prodcuts/Edit/Edit";

import IndexSaleOrder from "../Pages/SaleOrder/Index/Index";


export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Seciton */}
        <Route path={"/"} element={<IndexCustomer />} />
        <Route path={"/Customers/"} element={<IndexCustomer />} />
        <Route path={"/Customers/Index"} element={<IndexCustomer />} />
        <Route path={"/Customers/Add"} element={<AddCustomer />} />
        <Route path={"/Customers/Details/:id"} element={<DetailsCustomer />} />
        <Route path={"/Customers/Edit/:id"} element={<EditCustomer />} />

        {/* Product Seciton */}
        <Route path={"/Products/"} element={<IndexProduct />} />
        <Route path={"/Products/Index"} element={<IndexProduct />} />
        <Route path={"/Products/Add"} element={<AddProduct />} />
        <Route path={"/Products/Edit/:id"} element={<EditProduct />} />

        {/* SaleOrder Seciton */}
        <Route path={"/SaleOrders/"} element={<IndexSaleOrder />} />
        <Route path={"/SaleOrders/Index"} element={<IndexSaleOrder />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}
