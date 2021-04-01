import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useGetContacts } from "./api/getApi";

function App() {
  const contacts = useSelector((state: RootState) => state);
  console.log(contacts);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  useGetContacts();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
