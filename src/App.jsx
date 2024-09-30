import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "aos/dist/aos.css";
import Invitacion from "./components/Intivacion";
import Tickets from "./components/Tickets";
import AllGuestPage from "./components/AllGuestPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import InviteForm from "./components/InviteForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Invitacion />} />
          <Route path="/:id/:code" element={<Invitacion />} />
          <Route
            path="/pases-boda-arturo-y-noemi/:id/:user/:code"
            element={<Tickets />}
          ></Route>
          <Route
            path="/all-guests-page-arturo-y-noemi-boda/j13kl"
            element={<AllGuestPage />}
          />
          <Route
            path="/invite-form/access:digital-invite-by-esmeralda-01"
            element={<InviteForm />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
