import React from "react";
import { Box, Grommet } from "grommet";
import { Routes, Route, Outlet } from "react-router-dom";
import { Dashboard } from "./views/Dashboard";
import { People } from "./views/People";
import { Pipeline } from "./views/Pipeline";
import { Deals } from "./views/Deals";
import { Companies } from "./views/Companies";

export default function Root(props) {
  return (
    <Grommet style={{ display: "flex" }} full>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="people" element={<Outlet />}>
          <Route path="" element={<People />} />
          {/* <Route path=":id" element={<SinglePerson />} /> */}
        </Route>
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="deals" element={<Deals />} />
        <Route path="companies" element={<Companies />} />
      </Routes>
    </Grommet>
  );
}
