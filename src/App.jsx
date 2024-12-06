import { useState } from "react";

import "./App.css";
import Login from "./Auth/Login/Login";
import SignIn from "./Auth/Sign in/SignIn";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Login />
      <SignIn />
    </>
  );
}

export default App;
