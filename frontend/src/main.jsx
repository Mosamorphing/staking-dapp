import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client"; 
// import client from "./utils/client.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    {/* </ApolloProvider> */}
  </React.StrictMode>
);