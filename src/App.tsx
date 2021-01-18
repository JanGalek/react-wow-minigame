import React from 'react';
import {createGlobalStyle} from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import Layout from "./Components/Layout";

const GlobalStyle = createGlobalStyle`
  :root {
    --dark: #131416
  }

  body {
    background-color: var(--dark);
    color: var(--light)
  }
  
  nav {
    & > ul {
      display: flex;
      
      & > li {
        margin: 0 10px;
      }
    }
  }
`

const App = () => {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <h1>WoW Minigame puzzle</h1>
        <Layout />
    </BrowserRouter>
  );
}

export default App;
