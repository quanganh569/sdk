import posthog from "posthog-js";
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import CookieBanner from "./components/CookieBanner";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ToastContainer />

      {posthog.has_opted_out_capturing() || // new
      posthog.has_opted_in_capturing() ? null : (
        <CookieBanner />
      )}
    </div>
  )
}

export default App
