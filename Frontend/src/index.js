import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import './index.css';
import App from './App';
import { MyProvider } from "./Context/MyProvider"
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <MyProvider>
      <ChakraProvider>
        <App />

      </ChakraProvider>
    </MyProvider>
  </Router>
);

