import React from 'react'
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <h1>pure learn</h1>
      <Link to="/auth/login" className=' mx-5'>
        <button>Log In</button>
      </Link>
      <Link to="/auth/signup">
        <button>signup </button>
      </Link>
    </div>
  );
}
