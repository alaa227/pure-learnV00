import { useState } from "react";

import "./App.css";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Login />
      <SignUp/>
    </>
  );
}

export default App;
