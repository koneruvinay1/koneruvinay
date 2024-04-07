import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Protected from "./pages/protected-route";
import Dashboard from "./pages/Home/Dashboard";
import Login from "./auth/login";
import AdminUsers from "./pages/users/Admin";
import Employee from "./pages/users/Employee";
// import SuperMaster from "./pages/users/SuperMaster";
// import SubSuperMaster from "./pages/users/SubSuperMaster";
import AppUser from "./pages/users/AppUser";
import Today from "./pages/Reports/Today";
import Weekly from "./pages/Reports/Weekly";
import Monthly from "./pages/Reports/Monthly";
import Order from "./pages/Orders/Order";
import TrackOrder from "./pages/Orders/TrackOrder";
import Categories from "./pages/utils/Categories";

import Tags from "./pages/utils/Tags";
import SubCategories from "./pages/utils/SubCategories";
import Product from "./pages/Product/Product";
// import Master from "./pages/users/Master";
export default function Routers() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />

      <Route
        path="/dashboard"
        element={<Protected>{<Dashboard />}</Protected>}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminUsers />} />
      <Route path="/agent" element={<Employee />} />
      <Route path="/user" element={<AppUser />} />
      <Route path="/Today" element={<Today />} />
      <Route path="/Weekly" element={<Weekly />} />
      <Route path="/Monthly" element={<Monthly />} />
      <Route path="/Order" element={<Order />} />
      <Route path="/TrackOrder" element={<TrackOrder />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/subctegories" element={<SubCategories />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/Product" element={<Product />} />
    </Routes>
  );
}
