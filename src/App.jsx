import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "aos/dist/aos.css";
import Invitacion from "./components/Intivacion";
import Tickets from "./components/Tickets";
import AllGuestPage from "./components/GuestsPage/AllGuestPage";
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
            path="/pases-boda/:id/:user/:code"
            element={<Tickets />}
          ></Route>
          <Route path="/data-page" element={<AllGuestPage />} />
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
