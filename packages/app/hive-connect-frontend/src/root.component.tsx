import React from "react";
import { Box, Button, Grommet } from "grommet";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { SidebarView } from "@hexhive/ui";

import { Dashboard } from "./views/Dashboard";
import { People } from "./views/People";
import { Pipeline } from "./views/Pipeline";
import { Deals } from "./views/Deals";
import { Companies } from "./views/Companies";

export default function Root(props) {
  return (
    <Grommet style={{ display: "flex" }} full>
      <BrowserRouter>
        <SidebarView
          menu={[
            {
              component: <Dashboard />,
              label: "Dashboard",
              path: "dashboard/hive-connect/dashboard",
            },
            {
              component: <Pipeline />,
              label: "Pipeline",
              path: "dashboard/hive-connect/piepline",
            },
            {
              component: <Deals />,
              label: "Deals",
              path: "dashboard/hive-connect/deals",
            },
            {
              component: <People />,
              label: "People",
              path: "dashboard/hive-connect/people",
            },
            {
              component: <Companies />,
              label: "Companies",
              path: "dashboard/hive-connect/companies",
            },
          ]}
        />
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
      </BrowserRouter>
    </Grommet>
  );
}
