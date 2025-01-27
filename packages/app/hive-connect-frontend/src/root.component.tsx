import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ContactList } from "./views/contact-list";
import { OrderList } from "./views/order-list";
import { RequestList } from "./views/request-list";
import { ThemeProvider } from "@mui/material";

import { HexHiveTheme } from '@hexhive/styles';
import { HomeView } from "./views/home";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

export default function Root(props: any) {

  const API_URL = localStorage.getItem('HEXHIVE_API');
  
  const URL = `${process.env.NODE_ENV == 'production'
    ? `${API_URL || process.env.REACT_APP_API}/graphql`
    : "http://localhost:7000/graphql"}`;
  
  const client = new ApolloClient({
    link: new HttpLink({uri: URL, credentials: 'include'}),
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return <ApolloProvider client={client}>
   <ThemeProvider theme={HexHiveTheme}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div style={{background: '#dfdfdf', display: 'flex', flex: 1 }}>
        <div style={{ display: 'flex', minWidth: '200px' }}>
          <Sidebar />
        </div>
        <div style={{  flex: 1, padding: '8px', display: 'flex' }}>
          <Routes>
            <Route path="" element={<HomeView />} />
            <Route path="contacts" element={<ContactList />} />
            <Route path="requests" element={<RequestList />} />
            <Route path="orders" element={<OrderList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </ThemeProvider>
  </ApolloProvider>;
}
