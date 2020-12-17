import React from 'react';
import Game from "./Components/Game";
import {createGlobalStyle} from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'

const GlobalStyle = createGlobalStyle`
  :root {
    --dark: #131416
  }

  body {
    background-color: var(--dark);
  }
`

const App = () => {
  return (
    <>
        <GlobalStyle />
        <h1>WoW Minigame puzzle</h1>
        <Game />
    </>
  );
}

export default App;
