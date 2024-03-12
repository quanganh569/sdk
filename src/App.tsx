import posthog from "posthog-js";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CookieBanner from "./components/CookieBanner";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  optout: boolean;
  country: string;
  data_source: string;
  additional_data: null;
  ip_address: string;
  consentStatus: string;
  privacy_policy: boolean;
  terms_and_conditions: boolean;
}

function App() {
  return (
    <>
      <ToastContainer />

      {posthog.has_opted_out_capturing() || // new
      posthog.has_opted_in_capturing() ? null : (
        <CookieBanner />
      )}
    </>
  );
}

export default App;
